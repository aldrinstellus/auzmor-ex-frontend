import Button, { Variant } from 'components/Button';
import Card from 'components/Card';
import Collapse from 'components/Collapse';
import Divider from 'components/Divider';
import Layout, { FieldType } from 'components/Form';
import Icon from 'components/Icon';
import { FC, ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import NoAnnouncement from 'images/NoAnnouncement.svg';
import { useDropzone } from 'react-dropzone';
import { getMediaObj, titleCase } from 'utils/misc';
import {
  IMediaValidationError,
  MediaValidationError,
} from 'contexts/CreatePostContext';
import { MB } from 'utils/constants';
import { IRadioListOption } from 'components/RadioGroup';
import { useUpdateBrandingMutation } from 'queries/organization';
import { useBrandingStore } from 'stores/branding';
import { IBranding } from 'contexts/AuthContext';

interface IBrandingSettingsProps {
  branding?: IBranding;
}

const Preview: FC<{
  file: File | null;
  validation: IMediaValidationError[];
  url?: string;
  isVideo?: boolean;
  title?: string;
  description?: ReactNode;
  onRemove?: () => void;
}> = ({
  file,
  validation,
  url,
  title,
  description,
  onRemove = () => {},
  isVideo,
}) => {
  const [removePreview, setReviewPreview] = useState(false);
  return file && !!!validation?.length ? (
    <div className="max-h-full max-w-full relative">
      {isVideo ? (
        <video
          src={getMediaObj([file])[0].original}
          className="max-h-full max-w-full"
        />
      ) : (
        <img
          src={getMediaObj([file])[0].original}
          className="max-h-full max-w-full"
        />
      )}

      <div
        className="absolute -right-3 -top-3 w-6 h-6 rounded-full flex items-center justify-center bg-black group"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        <Icon name="close" size={16} color="text-white" />
      </div>
    </div>
  ) : url && !removePreview ? (
    <div className="max-h-full max-w-full relative">
      {isVideo ? (
        <video src={url} className="max-h-full max-w-full" />
      ) : (
        <img src={url} className="object-contain" />
      )}

      <div
        className="absolute -right-3 -top-3 w-6 h-6 rounded-full flex items-center justify-center bg-black group"
        onClick={(e) => {
          e.stopPropagation();
          setReviewPreview(true);
        }}
      >
        <Icon name="close" size={16} color="text-white" />
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center gap-2">
      <Icon name="documentUpload" color="text-neutral-900" hover={false} />
      <div className="text-neutral-900 font-medium">{title}</div>
      <div className="mt-1 text-neutral-500 text-xs text-center">
        {description}
      </div>
    </div>
  );
};

const BrandingSettings: FC<IBrandingSettingsProps> = ({ branding }) => {
  const backgroundOption: IRadioListOption[] = [
    {
      data: { value: 'Color' },
      dataTestId: 'color',
    },
    {
      data: { value: 'Video' },
      dataTestId: 'video',
    },
    {
      data: { value: 'Image' },
      dataTestId: 'image',
    },
  ];
  const { control, setValue, watch } = useForm({
    defaultValues: {
      primaryColor: branding?.primaryColor || '#10B981',
      secondaryColor: branding?.secondaryColor || '#1d4ed8',
      backgroundType:
        titleCase(branding?.loginConfig?.backgroundType || '') ||
        titleCase(backgroundOption[2].data.value),
      color: branding?.loginConfig?.color || '#123456',
      pageTitle: branding?.pageTitle || 'Auzmor Office',
      text: branding?.loginConfig?.text,
    },
  });
  const setBranding = useBrandingStore((state) => state.setBranding);
  const [selectedLogo, setSelectedLogo] = useState<File | null>(null);
  const [selectedFavicon, setSelectedFavicon] = useState<File | null>(null);
  const [selectedBG, setSelectedBG] = useState<File | null>(null);
  const [selectedBGVideo, setSelectedBGVideo] = useState<File | null>(null);
  const [logoValidation, setLogoValidation] = useState<IMediaValidationError[]>(
    [],
  );
  const [faviconValidation, setFaviconValidation] = useState<
    IMediaValidationError[]
  >([]);
  const [bgValidation, setBGValidation] = useState<IMediaValidationError[]>([]);
  const [bgVideoValidation, setBGVideoValidation] = useState<
    IMediaValidationError[]
  >([]);
  const [showSecondaryColor, setShowSecondaryColor] = useState(false);
  const [layoutAlignment, setLayoutAlignment] = useState<
    'CENTER' | 'LEFT' | 'RIGHT'
  >(branding?.loginConfig?.layout || 'RIGHT');

  const [primaryColor, secondaryColor, backgroundType, color, pageTitle] =
    watch([
      'primaryColor',
      'secondaryColor',
      'backgroundType',
      'color',
      'pageTitle',
    ]);

  const updateBranding = useUpdateBrandingMutation();

  const { getRootProps: getRootPropsLogo, getInputProps: getInputPropsLogo } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        setSelectedLogo(acceptedFiles[0]);
      },
      onDropRejected: (rejection) => {
        // extension validation
        const error = rejection[0].errors[0];
        const fimeName = rejection[0].file.name;
        if (error.code === 'file-invalid-type') {
          setLogoValidation([
            ...logoValidation.filter(
              (error) =>
                error.errorType !== MediaValidationError.FileTypeNotSupported,
            ),
            {
              errorMsg: `File type must be .png, .jpg, .jpeg, .svg`,
              errorType: MediaValidationError.IncorrectDimension,
              fileName: fimeName,
            },
          ]);
        }
      },
      maxFiles: 1,
      accept: {
        'image/png': ['.png'],
        'image/svg': ['.svg'],
        'image/jpeg': ['.jpg', '.jpeg'],
      },
      validator: (file) => {
        // size validation
        if (file.size > 1 * MB) {
          setLogoValidation([
            ...logoValidation.filter(
              (error) =>
                error.errorType !== MediaValidationError.ImageSizeExceed,
            ),
            {
              errorMsg: `Max file size 5mb`,
              errorType: MediaValidationError.ImageSizeExceed,
              fileName: file.name,
            },
          ]);
        }

        // dimension validation
        const image = new Image();
        image.src = getMediaObj([file])[0].original;
        image.onload = () => {
          const { height, width } = image;
          console.log(width, height);
          if (height != 30 || width != 150) {
            setLogoValidation([
              ...logoValidation.filter(
                (error) =>
                  error.errorType !== MediaValidationError.IncorrectDimension,
              ),
              {
                errorMsg: `Dimension should be 150 x 30 px`,
                errorType: MediaValidationError.IncorrectDimension,
                fileName: file.name,
              },
            ]);
          }
        };
        return null;
      },
    });
  const {
    getRootProps: getRootPropsFavicon,
    getInputProps: getInputPropsFavicon,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSelectedFavicon(acceptedFiles[0]);
    },
    maxFiles: 1,
    accept: {
      'image/png': ['.png'],
      'image/svg': ['.svg'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/x-icon': ['.ico'],
    },
    onDropRejected: (rejection) => {
      // extension validation
      const error = rejection[0].errors[0];
      const fimeName = rejection[0].file.name;
      if (error.code === 'file-invalid-type') {
        setFaviconValidation([
          ...faviconValidation.filter(
            (error) =>
              error.errorType !== MediaValidationError.FileTypeNotSupported,
          ),
          {
            errorMsg: `File type must be .png, .jpg, .jpeg, .svg, .ico`,
            errorType: MediaValidationError.IncorrectDimension,
            fileName: fimeName,
          },
        ]);
      }
    },
    validator: (file) => {
      // size validation
      if (file.size > 5 * MB) {
        setFaviconValidation([
          ...faviconValidation.filter(
            (error) => error.errorType !== MediaValidationError.ImageSizeExceed,
          ),
          {
            errorMsg: `Max file size 5mb`,
            errorType: MediaValidationError.ImageSizeExceed,
            fileName: file.name,
          },
        ]);
      }

      // dimension validation
      const image = new Image();
      image.src = getMediaObj([file])[0].original;
      image.onload = () => {
        const { height, width } = image;
        if (height !== 32 || width !== 32) {
          setFaviconValidation([
            ...logoValidation.filter(
              (error) =>
                error.errorType !== MediaValidationError.IncorrectDimension,
            ),
            {
              errorMsg: `Dimension should be 32 x 32 px`,
              errorType: MediaValidationError.IncorrectDimension,
              fileName: file.name,
            },
          ]);
        }
      };
      return null;
    },
  });

  const { getRootProps: getRootPropsBG, getInputProps: getInputPropsBG } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        setSelectedBG(acceptedFiles[0]);
      },
      maxFiles: 1,
      accept: {
        'image/png': ['.png'],
        'image/svg': ['.svg'],
        'image/jpeg': ['.jpg', '.jpeg'],
      },
      onDropRejected: (rejection) => {
        // extension validation
        const error = rejection[0].errors[0];
        const fimeName = rejection[0].file.name;
        if (error.code === 'file-invalid-type') {
          setBGValidation([
            ...bgValidation.filter(
              (error) =>
                error.errorType !== MediaValidationError.FileTypeNotSupported,
            ),
            {
              errorMsg: `File type must be .png, .jpg, .jpeg, .svg, .ico`,
              errorType: MediaValidationError.FileTypeNotSupported,
              fileName: fimeName,
            },
          ]);
        }
      },
      validator: (file) => {
        // size validation
        if (file.size > 1 * MB) {
          setBGValidation([
            ...faviconValidation.filter(
              (error) =>
                error.errorType !== MediaValidationError.ImageSizeExceed,
            ),
            {
              errorMsg: `Max file size 5mb`,
              errorType: MediaValidationError.ImageSizeExceed,
              fileName: file.name,
            },
          ]);
        }
        return null;
      },
    });

  const {
    getRootProps: getRootPropsBGVideo,
    getInputProps: getInputPropsBGVideo,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSelectedBGVideo(acceptedFiles[0]);
    },
    maxFiles: 1,
    accept: {
      'video/mp4': ['.mp4'],
      'video/webm': ['.webm'],
    },
    onDropRejected: (rejection) => {
      // extension validation
      const error = rejection[0].errors[0];
      const fimeName = rejection[0].file.name;
      if (error.code === 'file-invalid-type') {
        setBGVideoValidation([
          ...bgVideoValidation.filter(
            (error) =>
              error.errorType !== MediaValidationError.FileTypeNotSupported,
          ),
          {
            errorMsg: `File type must be .mp4, .webm`,
            errorType: MediaValidationError.FileTypeNotSupported,
            fileName: fimeName,
          },
        ]);
      }
    },
    validator: (file) => {
      // size validation
      if (file.size > 1 * MB) {
        setBGValidation([
          ...faviconValidation.filter(
            (error) => error.errorType !== MediaValidationError.VideoSizeExceed,
          ),
          {
            errorMsg: `Max file size 5mb`,
            errorType: MediaValidationError.VideoSizeExceed,
            fileName: file.name,
          },
        ]);
      }
      return null;
    },
  });

  const resetValidationError = (
    type: 'LOGO' | 'FAVICON' | 'BACKGROUND_IMAGE' | 'BACKGROUND_VIDEO',
  ) => {
    switch (type) {
      case 'LOGO':
        setLogoValidation([]);
        return;
      case 'FAVICON':
        setFaviconValidation([]);
        return;
      case 'BACKGROUND_IMAGE':
        setBGValidation([]);
        return;
      case 'BACKGROUND_VIDEO':
        setBGVideoValidation([]);
    }
  };

  return (
    <>
      <Card className="p-6">
        <div className="flex justify-between w-full">
          <div className="flex flex-col gap-4">
            <p className="text-neutral-900 text-base font-bold">Branding</p>
            <p className="text-neutral-500 text-sm">
              Branding Options for a Personalized Experience
            </p>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-2">
              <Button label="Cancel" variant={Variant.Secondary} />
              <Button
                label="Save changes"
                onClick={() => {
                  setBranding({
                    primaryColor,
                    secondaryColor,
                    pageTitle,
                    loginConfig: {
                      layout: layoutAlignment,
                      backgroundType: backgroundType.toLocaleUpperCase() as any,
                    },
                  });
                  updateBranding.mutate({
                    primaryColor,
                    secondaryColor,
                    pageTitle,
                    loginConfig: {
                      layout: layoutAlignment,
                      backgroundType: backgroundType.toLocaleUpperCase() as any,
                    },
                  });
                }}
              />
            </div>
            <div></div>
          </div>
        </div>
      </Card>
      <Collapse
        defaultOpen
        label="Page settings"
        headerTextClassName="text-base font-bold text-neutral-900"
        dataTestId="brandingsetting-pagesettings"
        height={393}
      >
        <div className="flex flex-col gap-4 bg-white px-6 pb-4 rounded-b-9xl">
          <Divider />
          <Layout
            fields={[
              {
                name: 'pageTitle',
                label: 'Page Title',
                type: FieldType.Input,
                control,
                className: '',
                dataTestId: 'page-title',
              },
            ]}
          />
          <div className="flex gap-[100px]">
            <div className="flex flex-col w-1/2 gap-1">
              <div>Logo</div>
              <div
                {...getRootPropsLogo()}
                className="border border-dashed border-neutral-200 rounded-9xl p-6 w-full h-[186px] flex justify-center items-center"
              >
                <input {...getInputPropsLogo()} />
                <Preview
                  file={selectedLogo}
                  validation={logoValidation}
                  url={branding?.logo}
                  title="Upload Image"
                  description={
                    <span>
                      Drag and drop or click here to upload file. <br /> Ideal
                      image size: 150 x 30 px
                    </span>
                  }
                  onRemove={() => {
                    setSelectedLogo(null);
                    resetValidationError('LOGO');
                  }}
                />
              </div>
              {logoValidation?.length > 0 && (
                <p className="text-xxs text-neutral-500">
                  {logoValidation[0].errorMsg}
                </p>
              )}
            </div>
            <div className="flex flex-col w-1/2 gap-1">
              <div>Favicon</div>
              <div
                {...getRootPropsFavicon()}
                className="border border-dashed border-neutral-200 rounded-9xl p-6 w-full h-[186px] flex justify-center items-center"
              >
                <input {...getInputPropsFavicon()} />
                <Preview
                  file={selectedFavicon}
                  validation={faviconValidation}
                  url={branding?.favicon?.original}
                  title="Upload Icon"
                  description={
                    <span>
                      Drag and drop or click here to upload file. <br /> Ideal
                      image size: 32 x 32 px
                    </span>
                  }
                  onRemove={() => {
                    setSelectedFavicon(null);
                    resetValidationError('FAVICON');
                  }}
                />
              </div>
              {faviconValidation?.length > 0 && (
                <p className="text-xxs text-neutral-500">
                  {faviconValidation[0].errorMsg}
                </p>
              )}
            </div>
          </div>
        </div>
      </Collapse>
      <Collapse
        defaultOpen
        label="Colour theme"
        headerTextClassName="text-base font-bold text-neutral-900"
        dataTestId="brandingsetting-colour-theme"
        height={333}
      >
        <div className="flex flex-col gap-4 bg-white px-6 pb-4 rounded-b-9xl">
          <Divider />
          <div className="flex w-full items-center gap-[160px]">
            <div className="w-2/5 flex flex-col gap-4">
              <Layout
                fields={[
                  {
                    name: 'primaryColor',
                    label: 'Primary/action colour',
                    type: FieldType.ColorPicker,
                    control,
                    className: '',
                    dataTestId: 'primary-color',
                    setValue,
                  },
                ]}
              />
              {showSecondaryColor ? (
                <Layout
                  fields={[
                    {
                      name: 'secondaryColor',
                      label: 'Secondary/action colour',
                      type: FieldType.ColorPicker,
                      control,
                      className: '',
                      dataTestId: 'secondary-color',
                      setValue,
                    },
                  ]}
                />
              ) : (
                <div
                  className="flex text-primary-500 group cursor-pointer group-hover:text-primary-700 text-base font-bold"
                  onClick={() => setShowSecondaryColor(true)}
                >
                  <Icon name="add" color="text-primary-500" />
                  <p>Add secondary colour</p>
                </div>
              )}
            </div>
            <div className="w-[182px] flex flex-col rounded-7xl overflow-hidden gap-1 border border-neutral-200 shadow-sm">
              <div
                className="p-3 flex gap-2 px-2.5"
                style={{ backgroundColor: secondaryColor }}
              >
                <Icon
                  name="flashIcon"
                  className="text-white"
                  hover={false}
                  size={16}
                />
                <p className="text-white font-bold text-xs">Secondary</p>
              </div>
              <p className="text-neutral-900 font-bold text-base text-center px-2.5">
                Lorem ipsum dolor
              </p>
              <p className="font-normal text-[8px] text-neutral-500 text-center px-2.5">
                Lorem ipsum dolor si amet. Lorem ipsum dolor si amet
              </p>
              <img src={NoAnnouncement} className="h-[70px]" />

              <div
                className="flex items-center justify-center text-white rounded-19xl px-2.5 py-2 mx-2.5 text-sm font-bold"
                style={{ backgroundColor: primaryColor }}
              >
                Primary
              </div>
              <p className="font-normal text-[8px] text-neutral-500 text-center px-2.5 mb-4">
                Only admins can see this.
              </p>
            </div>
          </div>
        </div>
      </Collapse>
      <Collapse
        defaultOpen
        label="Login"
        headerTextClassName="text-base font-bold text-neutral-900"
        dataTestId="brandingsetting-login"
        height={511}
      >
        <div className="flex flex-col gap-4 bg-white px-6 pb-4 rounded-b-9xl">
          <Divider />
          <div className="flex w-full gap-[120px]">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <p className="text-sm font-bold text-neutral-900">
                  Layout alignment
                </p>
                <div className="flex gap-[60px]">
                  <div
                    className="flex flex-col items-center gap-2"
                    onClick={() => setLayoutAlignment('LEFT')}
                  >
                    <div
                      className={`w-[100px] h-[60px] bg-neutral-100 relative border border-neutral-200 rounded-7xl ${
                        layoutAlignment === 'LEFT' &&
                        'border-primary-500 border-2'
                      }`}
                    >
                      <div className="absolute top-0 left-0 h-full w-[40px] rounded-7xl bg-neutral-400"></div>
                    </div>
                    <p className="text-neutral-900 font-medium text-sm">Left</p>
                  </div>
                  <div
                    className="flex flex-col items-center gap-2"
                    onClick={() => setLayoutAlignment('CENTER')}
                  >
                    <div
                      className={`w-[100px] h-[60px] bg-neutral-100 flex justify-center border border-neutral-200 rounded-7xl ${
                        layoutAlignment === 'CENTER' &&
                        'border-primary-500 border-2'
                      }`}
                    >
                      <div className="h-full w-[40px] rounded-7xl bg-neutral-400"></div>
                    </div>
                    <p className="text-neutral-900 font-medium text-sm">
                      Center
                    </p>
                  </div>
                  <div
                    className="flex flex-col items-center gap-2"
                    onClick={() => setLayoutAlignment('RIGHT')}
                  >
                    <div
                      className={`w-[100px] h-[60px] bg-neutral-100 relative border border-neutral-200 rounded-7xl ${
                        layoutAlignment === 'RIGHT' &&
                        'border-primary-500 border-2'
                      }`}
                    >
                      <div className="absolute top-0 right-0 h-full w-[40px] rounded-7xl bg-neutral-400"></div>
                    </div>
                    <p className="text-neutral-900 font-medium text-sm">
                      Right
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-sm font-bold text-neutral-900">
                  Select Background type
                </p>
                <Layout
                  fields={[
                    {
                      type: FieldType.Radio,
                      name: 'backgroundType',
                      className: 'flex !flex-row gap-4',
                      control,
                      radioList: backgroundOption,
                      labelRenderer: (option: IRadioListOption) => {
                        return (
                          <p className="pl-1 text-sm">{option.data.value}</p>
                        );
                      },
                    },
                  ]}
                />
              </div>
              {backgroundType === 'Image' && (
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-bold text-neutral-900">
                    Upload Image
                  </p>
                  <div
                    {...getRootPropsBG()}
                    className="border border-dashed border-neutral-200 rounded-9xl p-6 w-[420px] h-[186px] flex justify-center items-center"
                  >
                    <input {...getInputPropsBG()} />
                    <Preview
                      file={selectedBG}
                      validation={bgValidation}
                      url={branding?.loginConfig?.image?.original}
                      title="Upload Image"
                      description={
                        <span>
                          Drag and drop or click here to upload file. <br />{' '}
                          Ideal image size: 1920 x 860 px
                        </span>
                      }
                      onRemove={() => {
                        setSelectedBG(null);
                        resetValidationError('BACKGROUND_IMAGE');
                      }}
                    />
                  </div>
                  {bgValidation?.length > 0 && (
                    <p className="text-xxs text-neutral-500">
                      {bgValidation[0].errorMsg}
                    </p>
                  )}
                </div>
              )}
              {backgroundType === 'Video' && (
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-bold text-neutral-900">
                    Upload Video
                  </p>
                  <div
                    {...getRootPropsBGVideo()}
                    className="border border-dashed border-neutral-200 rounded-9xl p-6 w-[420px] h-[186px] flex justify-center items-center"
                  >
                    <input {...getInputPropsBGVideo()} />
                    <Preview
                      file={selectedBGVideo}
                      validation={bgVideoValidation}
                      url={branding?.loginConfig?.video?.original}
                      title="Upload Video"
                      description={
                        <span>
                          Drag and drop or click here to upload file. <br />{' '}
                          Ideal video size: 1920 x 860 px
                        </span>
                      }
                      onRemove={() => {
                        setSelectedBGVideo(null);
                        resetValidationError('BACKGROUND_VIDEO');
                      }}
                      isVideo
                    />
                  </div>
                  {bgValidation?.length > 0 && (
                    <p className="text-xxs text-neutral-500">
                      {bgValidation[0].errorMsg}
                    </p>
                  )}
                </div>
              )}
              {backgroundType === 'Color' && (
                <Layout
                  fields={[
                    {
                      name: 'color',
                      label: 'primary/action colour',
                      type: FieldType.ColorPicker,
                      control,
                      className: '',
                      dataTestId: 'text-color',
                      setValue,
                    },
                    {
                      name: 'text',
                      label: 'Add text',
                      type: FieldType.Input,
                      control,
                      className: '',
                      dataTestId: 'text',
                      placeholder: 'ex. welcome to auzmor',
                      maxLength: 50,
                    },
                  ]}
                />
              )}
            </div>
            <div className="flex relative">
              <div
                className={`w-[360px] h-[205px] flex items-center relative top-0 right-0 rounded-9xl border border-neutral-200 overflow-hidden ${
                  layoutAlignment === 'RIGHT' && 'justify-end'
                }   ${layoutAlignment === 'LEFT' && 'justify-start'}  ${
                  layoutAlignment === 'CENTER' && 'justify-center'
                }`}
                style={{
                  backgroundColor:
                    backgroundType === 'Color' ? color : '#ffffff',
                }}
              >
                <div
                  className={`bg-white pt-5 pl-8 pr-[47px] pb-2 relative ${
                    layoutAlignment === 'CENTER'
                      ? 'h-[191px] rounded-xl w-[159px]'
                      : 'h-full w-1/2'
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </Collapse>
    </>
  );
};

export default BrandingSettings;

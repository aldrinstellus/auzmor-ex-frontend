import { FC, useContext, useRef } from 'react';
import clsx from 'clsx';
import Icon from 'components/Icon';
import { lxpTemplateImages, officeTemplateImages } from './ImageTemplate';
import useProduct from 'hooks/useProduct';
import { CreatePostContext } from 'contexts/CreatePostContext';
import { updateEditorValue } from '../utils';

export interface IImagePickerProps {
  onSelect: (file: any) => void;
  selectedTemplate?: any;
}

const ImagePicker: FC<IImagePickerProps> = ({ selectedTemplate, onSelect }) => {
  const _imageRef = useRef<HTMLInputElement>(null);
  const { shoutoutUsers, setEditorValue, editorValue, setActiveFlow } =
    useContext(CreatePostContext);

  const _users: any = Object.values(shoutoutUsers).filter((user) => user);

  const updateContext = (label: string) => {
    const { text, html, editor } = updateEditorValue(_users, label);
    //@ts-ignore
    const mergedOps = [...editorValue?.editor?.ops, ...editor.ops]; // collate the previous editor value into the new one
    const newContent = {
      text: text,
      html: html,
      editor: { ops: mergedOps },
    };
    setEditorValue(newContent);
  };
  const handleSelectTemplate = (item: any) => {
    if (selectedTemplate?.id === item.id) {
      onSelect(null);
    } else {
      onSelect(item);
      updateContext(item.label);
    }
  };
  const { isOffice } = useProduct();
  const templateImages = isOffice ? officeTemplateImages : lxpTemplateImages;

  return (
    <div className="flex justify-center mb-2">
      <div className="inline-grid grid-cols-2 gap-4">
        {templateImages.map((item) => (
          <div
            key={item.id}
            className={clsx(
              'relative cursor-pointer max-h-[182px] min-h-[183px] max-w-[270px] border-1 border-neutral-200 w-full h-full rounded-[12px] overflow-hidden',
              { 'border-primary-500': item.id === selectedTemplate?.id },
            )}
            onClick={() => handleSelectTemplate(item)}
          >
            {item.id === selectedTemplate?.id && (
              <Icon
                name="tickCircle"
                className="absolute top-2 right-2"
                color="text-primary-500"
                hover
              />
            )}
            <img src={item.image} />
            <div className="py-3 px-2 text-sm font-semibold text-center">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePicker;

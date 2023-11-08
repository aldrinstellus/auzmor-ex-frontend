import Icon from 'components/Icon';
import { Check } from 'components/Logo';
import useModal from 'hooks/useModal';
import { FC } from 'react';
import { useUploadProgressStore } from 'stores/uploadProgressStore';

export const UploadProgress: FC = () => {
  const { progress, heading, content, setShowUploadProgress } =
    useUploadProgressStore();
  const [open, openCollpase, closeCollapse] = useModal(true);
  return (
    <div className="fixed w-full bottom-0 flex justify-center px-14 z-50">
      <div className="w-[1440px] flex flex-row-reverse">
        {content ? (
          <div
            className={`px-4 py-3 bg-neutral-900 rounded-t-9xl border border-neutral-300 w-[600px] transition-all duration-300 ease-in-out font-medium text-base text-white origin-top scale-y-100`}
          >
            {content}
          </div>
        ) : (
          <div
            className={`${
              open ? 'h-[74px]' : 'h-[50px]'
            } px-4 py-3 bg-neutral-900 rounded-t-9xl border border-neutral-300 w-[600px] transition-all duration-300 ease-in-out font-medium text-base text-white origin-top scale-y-100`}
          >
            <div className="flex justify-between items-center">
              <p>{heading}</p>
              <div className="flex gap-2 items-center">
                <Icon
                  name={!open ? 'arrowUp' : 'arrowDown'}
                  onClick={open ? closeCollapse : openCollpase}
                  hoverColor="text-white"
                  color="!text-white"
                  size={24}
                />
                <Icon
                  name="close"
                  onClick={() => setShowUploadProgress(false)}
                  hoverColor="text-white"
                  color="!text-white"
                  size={20}
                />
              </div>
            </div>
            <div
              className={`${
                open ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-300 ease-in-out flex items-center gap-4`}
            >
              <div>{progress}%</div>
              <div className="w-full rounded-[100px] bg-neutral-400 h-[5px] relative">
                <div
                  className={`h-full rounded-[100px] bg-primary-500`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export interface IUploadProgressTemplateProps {
  text?: string;
  btnLabel?: string;
  onBtnClick?: () => void;
  onClose?: () => void;
}

export const ProgressTemplateViewDetails: FC<IUploadProgressTemplateProps> = ({
  text = 'All members are added successfully',
  btnLabel = 'View details',
  onBtnClick = () => {},
  onClose = () => {},
}) => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
          <Check className="w-4 h-4" />
        </div>
        <p>{text}</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="cursor-pointer" onClick={onBtnClick}>
          {btnLabel}
        </p>
        <Icon
          name="close"
          hoverColor="text-white"
          color="!text-white"
          size={20}
          onClick={onClose}
        />
      </div>
    </div>
  );
};

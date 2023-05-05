import React, { useMemo } from 'react';
import { Metadata } from '../types';
import ImagePreview from './ImagePreview';
import IconPreview from './IconPreview';

type PreviewCardProps = {
  metaData: Metadata;
  setPreviewUrl: (previewUrl: string) => void;
  setIsPreviewRemove: (isPreviewRemove: boolean) => void;
  isLoading: boolean;
  isError: boolean;
};

const PreviewCard: React.FC<PreviewCardProps> = ({
  metaData,
  setPreviewUrl,
  setIsPreviewRemove,
  isLoading,
  isError,
}) =>
  useMemo(() => {
    if (metaData?.image) {
      return (
        <ImagePreview
          metaData={metaData}
          setPreviewUrl={setPreviewUrl}
          setIsPreviewRemove={setIsPreviewRemove}
        />
      );
    } else if (metaData?.favicon) {
      return (
        <IconPreview
          metaData={metaData}
          setPreviewUrl={setPreviewUrl}
          setIsPreviewRemove={setIsPreviewRemove}
        />
      );
    } else if (isLoading) {
      return (
        <div className="flex justify-center items-center mb-14">
          <div className="text-neutral-900 text-xs font-normal">
            Loading Preview
          </div>
        </div>
      );
    } else {
      return (
        <div>
          {isError ? (
            <div className="text-red-600 m-5">
              Cannot display preview. try valid link
            </div>
          ) : null}
        </div>
      );
    }
  }, [metaData, isLoading, isError]);

export default PreviewCard;

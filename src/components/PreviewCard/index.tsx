import IconPreview from 'components/PreviewLink/components/IconPreview';
import ImagePreview from 'components/PreviewLink/components/ImagePreview';
import { Metadata } from 'components/PreviewLink/types';
import React, { useMemo } from 'react';

type PreviewCardProps = {
  metaData: Metadata;
  isLoading?: boolean;
  isError?: boolean;
};

const PreviewCard: React.FC<PreviewCardProps> = ({
  metaData,
  isLoading,
  isError,
}) =>
  useMemo(() => {
    if (metaData?.image) {
      return <ImagePreview metaData={metaData} />;
    } else if (metaData?.favicon) {
      return <IconPreview metaData={metaData} />;
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

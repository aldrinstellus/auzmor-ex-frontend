import React from 'react';
import { usePreviewLink } from 'queries/post';
import { useDebounce } from 'hooks/useDebounce';
import PreviewCard from './components/PreviewCard';

export type PreviewLinkProps = {
  previewUrl: string;
  setPreviewUrl: (previewUrl: string) => void;
  setIsPreviewRemove: (isPreviewRemove: boolean) => void;
};

const PreviewLink: React.FC<PreviewLinkProps> = ({
  previewUrl,
  setPreviewUrl,
  setIsPreviewRemove,
}) => {
  const debouncePreviewUrl = useDebounce(previewUrl, 1000);
  const { data, isLoading, isError } = usePreviewLink(debouncePreviewUrl);

  return (
    <div>
      {previewUrl ? (
        <PreviewCard
          metaData={data}
          setPreviewUrl={setPreviewUrl}
          setIsPreviewRemove={setIsPreviewRemove}
          isLoading={isLoading}
          isError={isError}
        />
      ) : null}
    </div>
  );
};

export default PreviewLink;

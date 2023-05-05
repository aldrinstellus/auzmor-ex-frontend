import Card from 'components/Card';
import React from 'react';
import { Metadata } from '../types';
import ClosePreview from './ClosePreview';

type IconPreviewProps = {
  metaData: Metadata;
  setPreviewUrl: (previewUrl: string) => void;
  setIsPreviewRemove: (isPreviewRemove: boolean) => void;
};

const IconPreview: React.FC<IconPreviewProps> = ({
  metaData,
  setPreviewUrl,
  setIsPreviewRemove,
}) => {
  return (
    <Card className="bg-[#F7F8FB] h-[166px] mx-6 mb-11 relative rounded-7xl">
      <a href={metaData?.url} target="_blank" rel="noreferrer">
        <div className="flex p-8">
          <img
            src={metaData?.favicon}
            alt={metaData?.title}
            className="w-[100px] h-[80px] rounded-7xl"
          />
          <div className="flex flex-col ml-5 space-y-2 justify-center">
            <div className="text-black text-sm font-bold">
              {metaData?.title}
            </div>
            <div className="text-[#666666] font-normal text-xs">
              {metaData?.url}
            </div>
          </div>
        </div>
      </a>
      <ClosePreview
        setPreviewUrl={setPreviewUrl}
        setIsPreviewRemove={setIsPreviewRemove}
      />
    </Card>
  );
};

export default IconPreview;

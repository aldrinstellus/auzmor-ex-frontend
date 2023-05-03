import React, { SetStateAction, useState } from 'react';
import Card from 'components/Card';
import Icon from 'components/Icon';
import { usePreviewLink } from 'queries/post';

export type PreviewLinkProps = {
  link: string[];
  setShowPreview: (show: boolean) => void;
};

const imagePreviewLink = (
  metadata: Record<string, any>,
  setShowPreview: { (show: boolean): void; (arg0: boolean): void },
) => {
  return (
    <Card className="mx-6 mb-9">
      <div className="relative">
        <img
          src={metadata?.open_graph?.images[0]?.url}
          alt={metadata?.title}
          className="w-full h-40 rounded-md object-cover"
        />
        <button
          className="absolute top-0 right-0 p-2 bg-white border-1 border-neutral-200 border-solid rounded-7xl m-4 h-8 w-8"
          onClick={() => {
            setShowPreview(false);
          }}
        >
          <Icon name="cancel" size={10} />.
        </button>
      </div>
      <div className="flex flex-col bg-neutral-50 p-4">
        <div className="font-bold text-sm text-neutral-900">
          {metadata?.title}
        </div>
        <div className="text-xs text-neutral-500 font-normal mt-2">
          {metadata?.canonical_url}
        </div>
      </div>
    </Card>
  );
};

const iconPreviewLink = (
  metadata: Record<string, any>,
  setShowPreview: {
    (show: boolean): void;
    (arg0: boolean): void;
  },
) => {
  return (
    <Card className="bg-[#F7F8FB] h-40 mx-6 mb-11">
      <div className="relative">
        <button
          className="absolute top-0 right-0 p-2 bg-white border-1 border-neutral-200 border-solid rounded-7xl m-4 h-8 w-8"
          onClick={() => {
            setShowPreview(false);
          }}
        >
          <Icon name="cancel" size={10} />.
        </button>
      </div>
      <div className="flex p-8">
        <img
          src={metadata?.favicon}
          alt={metadata?.title}
          className="w-11 h-11"
        />
        <div className="flex flex-col ml-5 space-y-2">
          <div className="text-black text-sm font-bold">{metadata?.title}</div>
          <div className="text-[#666666] font-normal text-xs">
            {metadata?.canonical_url}
          </div>
        </div>
      </div>
    </Card>
  );
};

const PreviewLink: React.FC<PreviewLinkProps> = ({ link, setShowPreview }) => {
  const { data, isLoading } = usePreviewLink(link[0]);
  console.log(link, '$$$', '%', data);
  return (
    <div>
      {link.length > 0 ? (
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center mb-14">
              <div className="text-neutral-900 text-xs font-normal text">
                Loading Preview
              </div>
            </div>
          ) : (
            <div>
              {!data?.open_graph?.images[0]?.url
                ? imagePreviewLink(data, setShowPreview)
                : iconPreviewLink(data, setShowPreview)}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default PreviewLink;

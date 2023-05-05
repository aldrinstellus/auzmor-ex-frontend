import Carousel from 'components/Carousel';
import React, { useState } from 'react';

export interface IMedia {
  type: 'image' | 'video' | 'document';
  url: string;
  className?: string;
  name?: string;
}

export enum Mode {
  View = 'VIEW',
  Edit = 'EDIT',
}

export interface IMediaPreviewProps {
  media: IMedia[];
  className?: string;
  mode?: Mode;
}

const MediaPreview: React.FC<IMediaPreviewProps> = ({
  media,
  className,
  mode = Mode.View,
}) => {
  const [mediaIndex, setMediaIndex] = useState<number>(0);
  const [openSlideshow, setOpenSlideshow] = useState<boolean>(false);
  const MediaRender: React.FC<{
    data: IMedia;
    overlayCount?: number;
    localClassName?: string;
    index: number;
  }> = ({ data, overlayCount = -1, localClassName, index }) => {
    return (
      <div
        className={`rounded-9xl overflow-hidden w-full h-full bg-no-repeat bg-cover relative ${
          data.className
        } ${localClassName} ${mode === Mode.View ? 'cursor-pointer ' : ''}`}
        onClick={() => {
          if (mode === Mode.View) {
            setMediaIndex(index);
            setOpenSlideshow(true);
          }
        }}
      >
        <img src={data.url} className="h-full"></img>
        {overlayCount > 0 && (
          <div className="absolute flex top-0 left-0 bg-black/60 w-full h-full text-4xl justify-center font-bold text-white items-center">
            <span>+{overlayCount}</span>
          </div>
        )}
      </div>
    );
  };
  const getLayout = () => {
    if (media.length === 0) {
    } else if (media.length === 1) {
      return <MediaRender data={media[0]} index={0} />;
    } else if (media.length === 2) {
      return (
        <div className="flex w-full h-full">
          <MediaRender data={media[0]} localClassName="mr-4" index={0} />
          <MediaRender data={media[1]} index={1} />
        </div>
      );
    } else if (media.length === 3) {
      return (
        <div className="flex w-full h-full">
          <div className="mr-4">
            <MediaRender data={media[0]} index={0} />
          </div>
          <div className="flex flex-col">
            <MediaRender data={media[1]} localClassName="mb-4" index={1} />
            <MediaRender data={media[2]} index={2} />
          </div>
        </div>
      );
    } else if (media.length === 4) {
      return (
        <div className="flex flex-col w-full h-full">
          <div className="flex mb-4">
            <MediaRender data={media[0]} localClassName="mr-4" index={0} />
            <MediaRender data={media[1]} index={1} />
          </div>
          <div className="flex">
            <MediaRender data={media[2]} localClassName="mr-4" index={2} />
            <MediaRender data={media[3]} index={3} />
          </div>
        </div>
      );
    } else if (media.length === 5) {
      return (
        <div className="flex flex-col w-full h-full">
          <div className="flex mb-4">
            <MediaRender data={media[0]} localClassName="mr-4" index={0} />
            <MediaRender data={media[1]} index={1} />
          </div>
          <div className="flex">
            <MediaRender data={media[2]} localClassName="mr-4" index={2} />
            <MediaRender data={media[3]} localClassName="mr-4" index={3} />
            <MediaRender data={media[4]} index={4} />
          </div>
        </div>
      );
    } else if (media.length > 5) {
      return (
        <div className="flex flex-col w-full h-full">
          <div className="flex mb-4">
            <MediaRender data={media[0]} localClassName="mr-4" index={0} />
            <MediaRender data={media[1]} index={1} />
          </div>
          <div className="flex">
            <MediaRender data={media[2]} localClassName="mr-4" index={2} />
            <MediaRender data={media[3]} localClassName="mr-4" index={3} />
            <MediaRender
              data={media[4]}
              overlayCount={media.length - 5}
              index={4}
            />
          </div>
        </div>
      );
    }
  };
  return (
    <div className={`${className}`}>
      {getLayout()}
      <Carousel
        media={media}
        openCarousel={openSlideshow}
        setOpenCarousel={setOpenSlideshow}
        index={mediaIndex}
      />
    </div>
  );
};

export default MediaPreview;

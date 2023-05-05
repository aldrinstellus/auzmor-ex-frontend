import React, { ReactNode, useState, MouseEventHandler } from 'react';
import IconButton, {
  Variant as IconVariant,
  Size,
} from 'components/IconButton';

import Image from 'components/Image';
import Video from 'components/Video';

import clsx from 'clsx';
import Modal from 'components/Modal';
import Icon from 'components/Icon';

export interface IMedia {
  name?: string;
  url: string;
  type: 'image' | 'video' | 'document';
  hash?: string;
  coverPage?: string;
}

export interface hashSize {
  width: number;
  height: number;
}

export type CarouselProps = {
  media: IMedia[];
  onClose?: MouseEventHandler<Element>;
  hashSize?: hashSize;
  openCarousel: boolean;
  setOpenCarousel: any;
};

const Carousel: React.FC<CarouselProps> = ({
  media,
  hashSize = { width: 0, height: 0 },
  openCarousel,
  setOpenCarousel,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? Object.keys(media).length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === Object.keys(media).length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const containerStyles = clsx({
    'm-auto w-full h-full relative group rounded-xl': true,
  });

  const mediaDivStyles = clsx({
    'w-full h-full': true,
  });

  const currentIndexDivStyles = clsx({
    'absolute top-[5%] text-neutral-900 rounded-full p-1 px-2 left-8 bg-white cursor-pointer':
      true,
  });

  const leftArrowIconStyles = clsx({
    '!absolute !top-[50%] !left-8 !rounded-lg !cursor-pointer !p-1 !px-3': true,
  });

  const rightArrowIconStyles = clsx({
    '!absolute !top-[50%] !right-8 !rounded-lg !cursor-pointer !p-1 !px-3':
      true,
  });

  const crossIconStyles = clsx({
    '!top-[2%] !right-2 !absolute !right-8 !rounded-lg !p-1 !px-2': true,
  });

  return (
    <Modal open={openCarousel}>
      <div className={containerStyles}>
        <div className={mediaDivStyles}>
          {media[currentIndex].type === 'image' ? (
            <Image image={media[currentIndex]} hashSize={hashSize} />
          ) : (
            <Video video={media[currentIndex]} />
          )}
        </div>

        <div className={currentIndexDivStyles}>
          {currentIndex + 1} of {Object.keys(media).length}
        </div>

        <Icon
          name="carouselLeft"
          onClick={prevSlide}
          className={leftArrowIconStyles}
        />
        <Icon
          name="carouselRight"
          onClick={nextSlide}
          className={rightArrowIconStyles}
        />
        <Icon
          name="carouselClose"
          className={crossIconStyles}
          onClick={() => setOpenCarousel(false)}
        />
      </div>
    </Modal>
  );
};

export default Carousel;

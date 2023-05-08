import React, { useState } from 'react';
// import { Blurhash } from 'react-blurhash';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IMedia } from 'contexts/CreatePostContext';

export interface hashSize {
  width: number;
  height: number;
}

export type ImageProps = {
  image: IMedia;
  hashSize?: hashSize;
};

const Image: React.FC<ImageProps> = ({
  image = { blurhash: '', name: '', originalUrl: '', type: '' },
  hashSize,
}) => {
  const [isLoaded, setLoaded] = useState(false);
  const [isLoadStarted, setLoadStarted] = useState(false);

  const handleLoad = () => {
    setTimeout(() => {
      setLoaded(true);
      console.log('Delayed for 10 second.');
    }, 10000);
  };

  const handleLoadStarted = () => {
    console.log('Started: ');
    setLoadStarted(true);
  };

  const handleLoadEnd = () => {
    setLoaded(true);
    setLoadStarted(false);
  };

  return (
    <div className="w-full h-full relative">
      <LazyLoadImage
        className="w-[65vw] h-[80vh] object-cover"
        key={image.name}
        alt={image.name}
        src={image.originalUrl}
        // @ts-ignore
        onLoad={handleLoad}
        beforeLoad={handleLoadStarted}
        afterLoad={handleLoadEnd}
        placeholderSrc="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
      />
    </div>
  );
};

export default Image;

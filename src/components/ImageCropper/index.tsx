import React, { useMemo } from 'react';
import './index.css';
import clsx from 'clsx';
import {
  CircleStencil,
  Cropper,
  CropperRef,
  Priority,
} from 'react-advanced-cropper';

export enum Shape {
  Circle = 'circle',
  Rectangle = 'rectangle',
}

export type ImageCropperProps = {
  src: string;
  shape?: Shape;
  className?: string;
  cropperRef: React.RefObject<CropperRef>;
};

const ImageCropper = ({
  src,
  shape = Shape.Circle,
  className = '',
  cropperRef,
}: ImageCropperProps) => {
  const imageWrapperStyle = useMemo(
    () => clsx({ 'h-[550px]': true }, { [className]: true }),
    [className],
  );

  return (
    <div className={imageWrapperStyle}>
      {shape === Shape.Circle ? (
        <Cropper
          src={src}
          ref={cropperRef}
          stencilComponent={CircleStencil}
          stencilProps={{
            aspectRatio: 6 / 9,
            handlers: false,
            movable: true,
            resizable: true,
            lines: false,
            previewClassName: 'preview',
            overlayClassName: 'overlay',
          }}
          className="cropper"
        />
      ) : (
        <Cropper
          src={src}
          ref={cropperRef}
          stencilProps={{
            handlers: false,
            lines: false,
            resizable: false,
          }}
          // Modify the width and height to modify the stencil
          defaultVisibleArea={{
            width: 1000,
            height: 1000,
            left: 0,
            top: 0,
          }}
          className="cropper"
          maxHeight={180}
          priority={Priority.visibleArea}
        />
      )}
    </div>
  );
};

export default ImageCropper;

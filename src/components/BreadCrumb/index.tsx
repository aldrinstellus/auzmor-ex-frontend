import { Item } from 'contexts/DocumentPathContext';
import React, { FC, useMemo } from 'react';
import ChannelDocBreadcrumb from './components/ChannelDocBreadcrumb';
import ClassicBreadcrumb from './components/ClassicBreadcrumb';

export enum BreadCrumbVariantEnum {
  Classic = 'CLASSIC',
  ChannelDoc = 'CHANNEL_DOC',
}

interface IBreadCrumbProps {
  variant?: BreadCrumbVariantEnum;
  items: Item[];
  width?: number | '100%' | '100vw' | '100vh';
  className?: string;
  onItemClick?: (item: Item) => void;
}

const BreadCrumb: FC<IBreadCrumbProps> = ({
  variant = BreadCrumbVariantEnum.Classic,
  items,
  width,
  className,
  onItemClick = () => {},
}) => {
  const Component = useMemo(() => {
    switch (variant) {
      case BreadCrumbVariantEnum.Classic:
        return ClassicBreadcrumb;
      case BreadCrumbVariantEnum.ChannelDoc:
        return ChannelDocBreadcrumb;
    }
  }, [variant]);

  return (
    <Component
      items={items}
      width={width}
      onItemClick={onItemClick}
      className={className}
    />
  );
};

export default BreadCrumb;

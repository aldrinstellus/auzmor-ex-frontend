import Icon from 'components/Icon';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Item } from 'contexts/DocumentPathContext';
import TruncateMarkup from 'react-truncate-markup';

interface IClassicBreadcrumbProps {
  items: Item[];
  className?: string;
  onItemClick?: (item: Item) => void;
}

const ClassicBreadcrumb: FC<IClassicBreadcrumbProps> = ({
  items,
  className = '',
  onItemClick = () => {},
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [sliceIndex, setSliceIndex] = useState<number>(items.length);

  useEffect(() => {
    if (ref.current) {
      if (ref.current.clientWidth < ref.current.scrollWidth) {
        if (sliceIndex > 1) {
          setSliceIndex(sliceIndex - 1);
        } else {
          setSliceIndex(1);
        }
      }
    }
  }, [items, sliceIndex]);

  return (
    <div className="flex items-center gap-2 w-full" ref={ref}>
      {items.slice(0, sliceIndex).map((each, index) => (
        <div key={each.id} className="flex items-center gap-2 h-6">
          <Icon name="folder" size={20} />
          <TruncateMarkup>
            <span
              className={`flex font-medium text-neutral-500 cursor-pointer ${
                index === items.length - 1 &&
                'font-bold text-neutral-900 cursor-default'
              } ${className}`}
              onClick={() => onItemClick(each)}
            >
              {each.label}
            </span>
          </TruncateMarkup>
          {index < items.length - 1 && (
            <Icon name="arrowRight" size={16} hover={false} />
          )}
          {index === sliceIndex - 1 && index !== items.length - 1 && (
            <span>...</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default ClassicBreadcrumb;

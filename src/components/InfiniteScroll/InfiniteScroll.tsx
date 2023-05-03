import React, { LegacyRef, ReactNode } from 'react';
import useVirtual, { MeasureRef, OnScroll } from 'react-cool-virtual';

export type InfiniteScrollProps = {
  /**
   * Length of array
   */
  itemCount: number;

  /**
   * It should be true when first time loading is happening. It should not be true for upcomming data fetching
   */
  isLoading?: boolean;

  /**
   * A component when isLoading is true
   */
  loadingComponent?: ReactNode;

  /**
   * It should be true when api call is going on for load more data
   */
  isFetchingNextPage?: boolean;

  /**
   * Classes for outer div
   */
  outerClassName?: string;

  /**
   * Classes for inner div
   */
  innerClassName?: string;

  /**
   * A function that renders the item component
   */
  itemRenderer: (index: number, measureRef: MeasureRef) => ReactNode;

  /**
   * A function that will be called to load next set of data
   */
  loadMore: () => void;

  /**
   * Callback on scroll
   */
  onScroll?: OnScroll;
};

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  itemCount,
  isLoading,
  loadingComponent,
  isFetchingNextPage = false,
  outerClassName,
  innerClassName,
  itemRenderer,
  loadMore = () => {},
  onScroll = () => {},
}) => {
  const scrollbarWidth = () => {
    // thanks too https://davidwalsh.name/detect-scrollbar-width
    const scrollDiv = document.createElement('div');
    scrollDiv.setAttribute(
      'style',
      'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;',
    );
    document.body.appendChild(scrollDiv);
    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
  };

  const scrollbarHeight = () => {
    const ele = document.getElementById('officeApp');
    return ele?.scrollHeight || 1;
  };

  const { outerRef, innerRef, items } = useVirtual({
    itemCount,
    onScroll: (event) => {
      console.log('on scroll');
      if (
        // scrollOffset / scrollbarHeight() > 0.8 &&
        event.scrollOffset / scrollbarHeight() > 0.8 &&
        !isFetchingNextPage
      ) {
        console.log('scrolled to bottom');
        loadMore();
      }
      onScroll(event);
    },
  });

  return (
    <div ref={outerRef as LegacyRef<HTMLDivElement>} className={outerClassName}>
      <div
        ref={innerRef as LegacyRef<HTMLDivElement>}
        className={innerClassName}
      >
        {isLoading
          ? loadingComponent || <div>Loading...</div>
          : items.map(({ index, measureRef }) => {
              return itemRenderer(index, measureRef);
            })}
      </div>
    </div>
  );
};

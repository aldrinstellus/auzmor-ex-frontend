import React from 'react';
import Skeleton from 'react-loading-skeleton';

export interface IFilterListSkeletonProps {}

const FilterListSkeleton: React.FC<IFilterListSkeletonProps> = () => {
  return (
    <div className="w-full">
      <div className="flex">
        <Skeleton
          containerClassName="flex-1"
          borderRadius={100}
          className="!h-5"
        />
      </div>
    </div>
  );
};

export default FilterListSkeleton;

import Card from 'components/Card';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

export interface IAppCardSkeletonProps {}

const AppCardSkeleton: React.FC<IAppCardSkeletonProps> = () => {
  return (
    <Card className="min-w-[320px] max-w-xs min-h-[224px] max-h-56 border-1 flex flex-col">
      <div className="p-10 flex flex-col">
        <Skeleton className="!h-12 !w-12" />
        <div className="mt-2 flex">
          <Skeleton containerClassName="flex-1" borderRadius={100} />
        </div>
        <div className="mt-4 flex">
          <Skeleton containerClassName="flex-1" borderRadius={100} />
        </div>
        <div className="mt-2 flex">
          <Skeleton containerClassName="flex-1" borderRadius={100} />
        </div>
      </div>
    </Card>
  );
};

export default AppCardSkeleton;

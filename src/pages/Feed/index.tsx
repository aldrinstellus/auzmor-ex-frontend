import React, { ReactNode, useState } from 'react';
import { DeltaStatic } from 'quill';
import ActivityFeed from 'components/ActivityFeed';
import Icon from 'components/Icon';
import { IMenuItem } from 'components/PopupMenu';
import { twConfig } from 'utils/misc';
import Divider, { Variant } from 'components/Divider';
import PostBuilder from 'components/PostBuilder';
import { IPost, useInfiniteFeed } from 'queries/post';

interface IFeedProps {}

interface IContent {
  text: string;
  html: string;
  editor: DeltaStatic;
}

export interface IPostTypeIcon {
  id: number;
  label: string;
  icon: ReactNode;
  menuItems: IMenuItem[];
  divider?: ReactNode;
}

const Feed: React.FC<IFeedProps> = () => {
  const [showModal, setShowModal] = useState(false);

  const { isLoading, isError, error, data, fetchNextPage } = useInfiniteFeed();

  const feed = data?.pages.flatMap((page) => {
    return page.data?.result?.data.map((post: any) => {
      try {
        return post;
      } catch (e) {
        console.log('Error', { post });
      }
    });
  }) as IPost[];

  return (
    <div className="flex flex-col">
      <ActivityFeed
        activityFeed={feed}
        loadMore={fetchNextPage}
        setShowModal={setShowModal}
      />
      <PostBuilder showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default Feed;

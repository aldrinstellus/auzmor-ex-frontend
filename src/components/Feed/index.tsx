import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import PageLoader from 'components/PageLoader';
import PostBuilder from 'components/PostBuilder';
import useMediaQuery from 'hooks/useMediaQuery';
import useModal from 'hooks/useModal';
import useRole from 'hooks/useRole';
import {
  IPostFilters,
  PostFilterKeys,
  PostFilterPreference,
  PostType,
  PostTypeMapping,
  useInfiniteFeed,
} from 'queries/post';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useFeedStore } from 'stores/feedStore';
import { isFiltersEmpty, isRegularPost } from 'utils/misc';
import NoPosts from 'images/NoPostsFound.png';
import SkeletonLoader from './components/SkeletonLoader';
import VirtualisedPost from 'components/VirtualisedPost';
import useScrollTop from 'hooks/useScrollTop';
import HashtagFeedHeader from './components/HashtagFeedHeader';
import BookmarkFeedHeader from './components/BookmarkFeedHeader';
import ScheduledFeedHeader from './components/ScheduledFeedHeader';
import CreatePostCard from 'components/PostBuilder/components/CreatePostCard';
import Tooltip from 'components/Tooltip';
import Icon from 'components/Icon';
import Divider from 'components/Divider';
import FeedFilter, {
  filterKeyMap,
} from 'components/ActivityFeed/components/FeedFilters';
import AppLauncher from 'components/AppLauncher';
import LinksWidget, { LinksWidgetProps } from 'components/LinksWidget';
import ChannelRequestWidget, {
  ChannelRequestWidgetProps,
} from 'components/ChannelRequestWidget';
import MembersWidget, {
  MembersWidgetProps,
} from 'pages/ChannelDetail/components/MembersWidget';
import AdminsWidget from 'pages/ChannelDetail/components/AdminsWidget';

export enum WidgetEnum {
  AppLauncher = 'APP_LAUNCHER',
  Links = 'LINKS',
  ChannelRequest = 'CHANNEL_REQUEST',
  ChannelMember = 'CHANNEL_MEMBER',
  ChannelAdmin = 'CHANNEL_ADMIN',
}

export const widgetMapping = {
  [WidgetEnum.AppLauncher]: AppLauncher,
  [WidgetEnum.Links]: LinksWidget,
  [WidgetEnum.ChannelRequest]: ChannelRequestWidget,
  [WidgetEnum.ChannelMember]: MembersWidget,
  [WidgetEnum.ChannelAdmin]: AdminsWidget,
};

export enum FeedModeEnum {
  Default = 'DEFAULT',
  Channel = 'CHANNEL',
  Personal = 'PERSONAL',
}

interface IFeedProps {
  leftWidgets: WidgetEnum[];
  rightWidgets: WidgetEnum[];
  mode?: FeedModeEnum;
  widgetProps?: {
    [WidgetEnum.AppLauncher]?: null;
    [WidgetEnum.Links]?: LinksWidgetProps;
    [WidgetEnum.ChannelRequest]?: ChannelRequestWidgetProps;
    [WidgetEnum.ChannelMember]?: MembersWidgetProps;
    [WidgetEnum.ChannelAdmin]?: null;
  };
  modeProps?: {
    [FeedModeEnum.Default]?: {
      params: {
        entityType: string;
        entityId: string;
      };
    };
    [FeedModeEnum.Channel]?: {
      params: {
        entityType: string;
        entityId: string;
      };
    };
    [FeedModeEnum.Personal]?: {
      params: {
        entityType: string;
        entityId: string;
      };
    };
  };
}

const Feed: FC<IFeedProps> = ({
  leftWidgets,
  rightWidgets,
  mode,
  widgetProps,
  modeProps,
}) => {
  const { t } = useTranslation('feed');
  const isLargeScreen = useMediaQuery('(min-width: 1300px)');
  const [open, openModal, closeModal] = useModal(undefined, false);
  const { isAdmin } = useRole();
  const { feed } = useFeedStore();
  const { ref, inView } = useInView();
  const [searchParams] = useSearchParams();
  const currentDate = new Date().toISOString();
  const [appliedFeedFilters, setAppliedFeedFilters] = useState<IPostFilters>({
    [PostFilterKeys.PostType]: [],
    [PostFilterKeys.PostPreference]: [],
  });
  const { getScrollTop, pauseRecordingScrollTop, resumeRecordingScrollTop } =
    useScrollTop('app-shell-container');
  const { pathname } = useLocation();
  const hashtag = searchParams.get('hashtag') || '';
  const bookmarks = pathname === '/bookmarks';
  const scheduled = pathname === '/scheduledPosts';

  //handle scroll
  useEffect(() => {
    if (hashtag) {
      pauseRecordingScrollTop();
      const ele = document.getElementById('app-shell-container');
      if (ele) {
        ele.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
    } else {
      resumeRecordingScrollTop();
      const ele = document.getElementById('app-shell-container');
      if (ele) {
        ele.scrollTo({
          top: getScrollTop(),
          left: 0,
          behavior: 'smooth',
        });
      }
    }
  }, [hashtag]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteFeed(
      'feed',
      isFiltersEmpty({
        [PostFilterKeys.PostType]: appliedFeedFilters[PostFilterKeys.PostType]
          ?.map((postType) => (PostTypeMapping as any)[postType] || postType)
          .flat(),
        ...(appliedFeedFilters[PostFilterKeys.PostPreference]?.includes(
          PostFilterPreference.BookmarkedByMe,
        ) && { [PostFilterPreference.BookmarkedByMe]: true }),
        ...(appliedFeedFilters[PostFilterKeys.PostPreference]?.includes(
          PostFilterPreference.MentionedInPost,
        ) && { [PostFilterPreference.MentionedInPost]: true }),
        ...(appliedFeedFilters[PostFilterKeys.PostPreference]?.includes(
          PostFilterPreference.MyPosts,
        ) && { [PostFilterPreference.MyPosts]: true }),
        [PostFilterKeys.Hashtags]: appliedFeedFilters[PostFilterKeys.Hashtags],
        ...(modeProps as any)[mode as any].params,
      }),
    );

  const feedIds = (
    (data?.pages.flatMap((page) =>
      page.data?.result?.data
        .filter((post: { id: string }) => {
          if (bookmarks) {
            return !!feed[post.id]?.bookmarked;
          } else if (scheduled) {
            return !!feed[post.id]?.schedule;
          }
          return true;
        })
        .map((post: { id: string }) => post),
    ) as { id: string }[]) || []
  )
    ?.filter(({ id }) => !!feed[id])
    .sort(
      (a, b) =>
        new Date(feed[b.id].createdAt).getTime() -
        new Date(feed[a.id].createdAt).getTime(),
    );

  const announcementFeedIds = feedIds
    ? feedIds.filter(
        (post: { id: string }) =>
          !isRegularPost(feed[post.id], currentDate, isAdmin),
      )
    : [];

  const regularFeedIds = feedIds
    ? feedIds.filter((post: { id: string }) =>
        isRegularPost(feed[post.id], currentDate, isAdmin),
      )
    : [];

  const clearAppliedFilters = () => {
    setAppliedFeedFilters({
      ...appliedFeedFilters,
      [PostFilterKeys.PostType]: [],
      [PostFilterKeys.PostPreference]: [],
    });
  };

  const getAppliedFiltersCount = () => {
    return (
      appliedFeedFilters[PostFilterKeys.PostType]?.length ||
      appliedFeedFilters[PostFilterKeys.PostPreference]?.length ||
      0
    );
  };

  const removePostTypeFilter = (
    filter: PostType | PostFilterPreference,
    type: PostFilterKeys.PostType | PostFilterKeys.PostPreference,
  ) => {
    if (
      type === PostFilterKeys.PostType &&
      appliedFeedFilters[PostFilterKeys.PostType]
    ) {
      setAppliedFeedFilters({
        ...appliedFeedFilters,
        [PostFilterKeys.PostType]: appliedFeedFilters[
          PostFilterKeys.PostType
        ].filter((each) => each !== filter),
      });
    }
    if (
      type === PostFilterKeys.PostPreference &&
      appliedFeedFilters[PostFilterKeys.PostPreference]
    ) {
      setAppliedFeedFilters({
        ...appliedFeedFilters,
        [PostFilterKeys.PostPreference]: appliedFeedFilters[
          PostFilterKeys.PostPreference
        ].filter((each) => each !== filter),
      });
    }
  };

  const handleApplyFilter = useCallback((filters: IPostFilters) => {
    setAppliedFeedFilters(filters);
  }, []);

  const getEmptyFeedComponent = () => {
    if (bookmarks) {
      return (
        <div className="bg-white p-6 flex flex-col rounded-9xl">
          <div className="h-220 bg-blue-50 flex justify-center rounded-9xl">
            <img
              src={NoPosts}
              data-testid="mybookmark-tab-nopost"
              alt="No Posts"
            />
          </div>
          <div className="font-bold text-2xl/[36px] text-center mt-5">
            {t('bookmark.noPostFound')}
          </div>
          <div className="text-center mt-1" style={{ color: '#737373' }}>
            {t('bookmark.emptyMessage')}
          </div>
        </div>
      );
    }
    if (scheduled) {
      return (
        <div className="bg-white p-6 flex flex-col rounded-9xl">
          <div className="h-220 bg-blue-50 flex justify-center rounded-9xl">
            <img
              src={NoPosts}
              data-testid="mybookmark-tab-nopost"
              alt="No Posts"
            />
          </div>
          <div data-testid="scheduledpost-tab-nodata">
            <div className="font-bold text-base text-neutral-900 text-center mt-6">
              {t('scheduledPosts.emptyMessage1')}
            </div>
            <div className="font-bold text-base text-neutral-900 text-center">
              {t('scheduledPosts.emptyMessage2')}
            </div>
          </div>
        </div>
      );
    }
    if (
      appliedFeedFilters[PostFilterKeys.PostType]?.length ||
      appliedFeedFilters[PostFilterKeys.PostPreference]?.length
    ) {
      return (
        <div className="bg-white p-6 flex flex-col rounded-9xl">
          <div className="h-220 bg-blue-50 flex justify-center rounded-9xl">
            <img
              src={NoPosts}
              data-testid="mybookmark-tab-nopost"
              alt="No Posts"
            />
          </div>
          <div className="font-bold text-2xl/[36px] text-center mt-5">
            No posts found
          </div>
        </div>
      );
    }
    if (feedIds?.length == 0) {
      return (
        <div className="bg-white p-6 flex flex-col rounded-9xl">
          <div className="h-220 bg-blue-50 flex justify-center rounded-9xl">
            <img
              src={NoPosts}
              data-testid="mybookmark-tab-nopost"
              alt="No Posts"
            />
          </div>
          <div data-testid="scheduledpost-tab-nodata">
            <div className="text-neutral-900 font-semibold text-lg mt-6 text-center">
              Publish your first post!
            </div>
            <div className="text-neutral-500 text-sm font-medium text-center mt-2">
              Post something interesting for your audience, share an update,
              <br /> or just make a little introduction to the teams.
            </div>
          </div>
        </div>
      );
    }
  };

  const FilterPill = ({
    name,
    onClick,
  }: {
    name: string;
    onClick: () => void;
  }) => (
    <div
      key={name}
      className="border border-neutral-200 rounded-[24px] px-3 py-1 bg-white items-center flex gap-2 cursor-pointer outline-none group"
      onClick={onClick}
      onKeyUp={(e) => (e.code === 'Enter' ? onClick() : '')}
      tabIndex={0}
    >
      <p className="text-sm font-medium whitespace-nowrap text-neutral-900 group-hover:text-primary-600">
        {name}
      </p>
      <Icon
        name="closeCircleOutline"
        color="text-neutral-900"
        className="cursor-pointer"
        size={16}
      />
    </div>
  );

  const FeedHeader = useMemo(() => {
    if (hashtag) {
      return (
        <HashtagFeedHeader
          hashtag={hashtag}
          feedIds={feedIds}
          setAppliedFeedFilters={setAppliedFeedFilters}
        />
      );
    } else if (bookmarks) {
      return (
        <BookmarkFeedHeader setAppliedFeedFilters={setAppliedFeedFilters} />
      );
    } else if (scheduled) {
      return (
        <ScheduledFeedHeader setAppliedFeedFilters={setAppliedFeedFilters} />
      );
    } else {
      return (
        <div className="flex flex-col gap-6">
          <CreatePostCard openModal={openModal} />
          <div className=" flex flex-col gap-6">
            <div className="flex flex-row items-center gap-6">
              <div className="flex items-center gap-4 z-20">
                <Tooltip
                  tooltipContent={t('scheduledPosts.tooltip')}
                  tooltipPosition="top"
                >
                  <Link
                    to="/scheduledPosts"
                    aria-label="scheduled posts"
                    tabIndex={0}
                    className="outline-none"
                  >
                    <Icon name="clock" size={24} />
                  </Link>
                </Tooltip>
                <Tooltip
                  tooltipContent={t('bookmark.tooltip')}
                  tooltipPosition="top"
                >
                  <Link
                    to="/bookmarks"
                    data-testid="feed-page-mybookmarks"
                    aria-label="bookmarked posts"
                    className="outline-none"
                  >
                    <Icon name="postBookmark" size={24} />
                  </Link>
                </Tooltip>
              </div>
              <Divider className="bg-neutral-200 flex-1" />
              <div className="flex items-center gap-3">
                {getAppliedFiltersCount() > 0 && (
                  <div
                    className="flex items-center gap-1 cursor-pointer text-sm font-bold text-primary-600 bg-transparent"
                    onClick={clearAppliedFilters}
                    onKeyUp={(e) =>
                      e.code === 'Enter' ? clearAppliedFilters() : ''
                    }
                    tabIndex={0}
                    role="button"
                  >
                    <Icon
                      name="deleteOutline"
                      color="text-primary-600"
                      className="cursor-pointer"
                      size={16}
                    />
                    Clear All Filters
                  </div>
                )}
                <FeedFilter
                  appliedFeedFilters={appliedFeedFilters}
                  onApplyFilters={handleApplyFilter}
                  dataTestId="filters-dropdown"
                />
              </div>
            </div>

            {getAppliedFiltersCount() > 0 && (
              <div className="flex w-full flex-wrap items-center gap-1">
                {appliedFeedFilters[PostFilterKeys.PostType]?.map(
                  (filter: PostType) => (
                    <FilterPill
                      key={filter}
                      name={filterKeyMap[filter]}
                      onClick={() =>
                        removePostTypeFilter(filter, PostFilterKeys.PostType)
                      }
                    />
                  ),
                )}
                {appliedFeedFilters[PostFilterKeys.PostPreference]?.map(
                  (filter: PostFilterPreference) => (
                    <FilterPill
                      key={filter}
                      name={filterKeyMap[filter]}
                      onClick={() =>
                        removePostTypeFilter(
                          filter,
                          PostFilterKeys.PostPreference,
                        )
                      }
                    />
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      );
    }
  }, [hashtag, feedIds, bookmarks, scheduled]);

  const getLeftWidgets = () => {
    let Widget: any = null;
    return leftWidgets.map((widgetenum) => {
      Widget = widgetMapping[widgetenum];
      if (widgetProps && widgetProps[widgetenum]) {
        return <Widget {...widgetProps[widgetenum]} key={widgetenum} />;
      }
      return <Widget key={widgetenum} />;
    });
  };

  const getRightWidgets = () => {
    let Widget: any = null;
    return rightWidgets.map((widgetenum) => {
      Widget = widgetMapping[widgetenum];
      if (widgetProps && widgetProps[widgetenum]) {
        return <Widget {...widgetProps[widgetenum]} key={widgetenum} />;
      }
      return <Widget key={widgetenum} />;
    });
  };

  return (
    <section className="pb-6 flex justify-between">
      <section className="z-10 w-[293px] flex flex-col gap-6">
        {getLeftWidgets()}
      </section>
      <section className="flex-grow w-0 flex flex-col gap-6 px-12">
        {FeedHeader}
        {isLoading ? (
          <SkeletonLoader />
        ) : feedIds?.length === 0 ? (
          getEmptyFeedComponent()
        ) : (
          <ul className="flex flex-col gap-6">
            {[...announcementFeedIds, ...regularFeedIds]?.map(
              ({ id }, index) => (
                <li
                  data-testid={`feed-post-${index}`}
                  className="flex flex-col gap-6"
                  key={id}
                  tabIndex={0}
                  title={`post ${index + 1}`}
                >
                  <VirtualisedPost
                    postId={id!}
                    commentIds={feed[id]?.relevantComments || []}
                  />
                </li>
              ),
            )}
          </ul>
        )}

        {isFetchingNextPage ? (
          <div className="h-2">
            <PageLoader />
          </div>
        ) : (
          <div className="h-12 w-12">{hasNextPage && <div ref={ref} />}</div>
        )}
      </section>
      {isLargeScreen && (
        <section className="w-[293px] flex flex-col gap-6">
          {getRightWidgets()}
        </section>
      )}
      {open && (
        <PostBuilder
          open={open}
          openModal={openModal}
          closeModal={closeModal}
        />
      )}
    </section>
  );
};

export default Feed;

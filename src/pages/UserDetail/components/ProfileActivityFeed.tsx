import React from 'react';
import Post from 'components/Post';
import {
  IGetPost,
  useInfiniteMyProfileFeed,
  useInfinitePeopleProfileFeed,
} from 'queries/post';

export interface IProfileActivityFeedProps {
  userId: string;
  pathname?: string;
}

const ProfileActivityFeed: React.FC<IProfileActivityFeedProps> = ({
  pathname,
  userId,
}) => {
  const {
    data: myProfileActivityFeed,
    isLoading: isMyProfileActivityFeedLoading,
  } = useInfiniteMyProfileFeed();
  const { data: peopleProfileFeedData, isLoading: isPeopleProfileFeedLoading } =
    useInfinitePeopleProfileFeed(userId, {});

  const myProfileFeed = myProfileActivityFeed?.pages.flatMap((page) => {
    return page.data?.result?.data.map((post: any) => {
      try {
        return post;
      } catch (e) {
        console.log('Error', { post });
      }
    });
  }) as IGetPost[];

  const peopleProfileFeed = peopleProfileFeedData?.pages.flatMap((page) => {
    return page.data?.result?.data.map((post: any) => {
      try {
        return post;
      } catch (e) {
        console.log('Error', { post });
      }
    });
  }) as IGetPost[];

  return (
    <>
      {pathname === '/profile' ? (
        <div>
          {isMyProfileActivityFeedLoading && (
            <div className="mt-4">loading...</div>
          )}
          <div className="mt-4">
            {myProfileFeed?.length === 0 ? (
              <div>No User activity feed data available</div>
            ) : (
              <>
                {myProfileFeed?.map((post) => (
                  <Post data={post} key={post.id} />
                ))}
              </>
            )}
          </div>
        </div>
      ) : (
        <div>
          {isPeopleProfileFeedLoading && <div className="mt-4">loading...</div>}
          <div className="mt-4">
            {myProfileFeed?.length === 0 ? (
              <div>No People activity feed data available</div>
            ) : (
              <>
                {peopleProfileFeed?.map((post) => (
                  <Post data={post} key={post.id} />
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileActivityFeed;

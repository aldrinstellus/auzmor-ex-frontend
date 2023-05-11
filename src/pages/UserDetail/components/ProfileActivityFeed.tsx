import React from 'react';
import Post from 'components/Post';
import {
  IGetPost,
  useInfiniteMyProfileFeed,
  useInfinitePeopleProfileFeed,
} from 'queries/post';

export interface IProfileActivityFeedProps {
  pathname?: string;
}

const ProfileActivityFeed: React.FC<IProfileActivityFeedProps> = ({
  pathname,
}) => {
  const {
    data: myProfileActivityFeed,
    isLoading: isMyProfileActivityFeedLoading,
  } = useInfiniteMyProfileFeed();
  const { data: peopleProfileFeedData, isLoading: isPeopleProfileFeedLoading } =
    useInfinitePeopleProfileFeed();

  console.log(myProfileActivityFeed, 'FEED', peopleProfileFeedData);

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
            {myProfileFeed?.map((post) => (
              <Post data={post} key={post.id} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          {isPeopleProfileFeedLoading && <div className="mt-4">loading...</div>}
          <div className="mt-4">
            {peopleProfileFeed?.map((post) => (
              <Post data={post} key={post.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileActivityFeed;

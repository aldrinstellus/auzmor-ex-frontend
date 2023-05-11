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
  const { data, isLoading } = useInfiniteMyProfileFeed();
  const { data: peopleProfileFeedData, isLoading: isPeopleProfileFeedLoading } =
    useInfinitePeopleProfileFeed();

  console.log(data, 'FEED', peopleProfileFeedData);

  const myProfileFeed = data?.pages.flatMap((page) => {
    return page.data?.result?.data.map((post: any) => {
      try {
        return post;
      } catch (e) {
        console.log('Error', { post });
      }
    });
  }) as IGetPost[];

  const peopleProfileFeed = data?.pages.flatMap((page) => {
    return page.data?.result?.data.map((post: any) => {
      try {
        return post;
      } catch (e) {
        console.log('Error', { post });
      }
    });
  }) as IGetPost[];

  return (
    <div>
      {isLoading ? (
        <div className="mt-4">loading...</div>
      ) : (
        <div className="mt-4">
          {pathname === '/profile' ? (
            <>
              {myProfileFeed.map((post) => (
                <Post data={post} key={post.id} />
              ))}
            </>
          ) : (
            <>
              {peopleProfileFeed.map((post) => (
                <Post data={post} key={post.id} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileActivityFeed;

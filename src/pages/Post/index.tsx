import AnnouncementCard from 'components/AnnouncementWidget';
import Post from 'components/Post';
import UserCard from 'components/UserWidget';
import { IGetPost, useGetPost } from 'queries/post';
import React from 'react';
import { useParams } from 'react-router-dom';

const PostPage: React.FC = () => {
  const { id } = useParams();

  if (!id) {
    return <div>Error</div>;
  }

  const { data, isLoading, isError } = useGetPost(id);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error...</div>;
  }
  console.log({ data });
  const post = data.data?.result?.data as IGetPost;
  return (
    <>
      <div className="mb-12 space-x-8 flex w-full">
        <div className="sticky top-10 z-10 w-1/4">
          <UserCard />
        </div>
        <div className="w-1/2">
          <div className="mt-4">
            <Post data={post} />
          </div>
        </div>
        <div className="w-1/4">
          <AnnouncementCard />
        </div>
      </div>
    </>
  );
};

export default PostPage;

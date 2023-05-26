import AnnouncementCard from 'components/AnnouncementWidget';
import Card from 'components/Card';
import { activeCommentsDataType } from 'components/Comments';
import { Comment } from 'components/Comments/Comment';
import Post from 'components/Post';
import UserCard from 'components/UserWidget';
import { IGetPost, useGetPost } from 'queries/post';
import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const PostPage: React.FC = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const commentId = searchParams.get('commentId') || undefined;
  if (!id) {
    return <div>Error</div>;
  }

  const { data, isLoading, isError } = useGetPost(id, commentId);

  const [activeComment, setActiveComment] =
    useState<activeCommentsDataType | null>(
      commentId
        ? {
            id: commentId,
            type: 'abc',
          }
        : null,
    );
  const [replyInputBox, setReplyInputBox] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error...</div>;
  }
  const post = data.data?.result?.data as IGetPost;
  return (
    <>
      <div className="mb-12 space-x-8 flex w-full">
        <div className="sticky top-10 z-10 w-1/4">
          <UserCard />
        </div>
        <div className="w-1/2">
          <div className="mt-4">
            <Card>
              <Post data={post} />
              {post.comment && (
                <Comment
                  comment={post.comment}
                  setActiveComment={setActiveComment}
                  activeComment={activeComment}
                  setReplyInputBox={setReplyInputBox}
                  replyInputBox={replyInputBox}
                  className="m-4"
                />
              )}
            </Card>
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

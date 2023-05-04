import React, { useEffect, useState } from 'react';

import { Comment } from './Comment';
import { CommentForm } from './CommentForm';
import like from 'images/like.svg';
import icon from 'images/icon.png';
import { useComments } from 'queries/reaction';
import useAuth from 'hooks/useAuth';
import Avatar from 'components/Avatar';

interface CommentsProps {
  entityId: string;
}

export interface DataType {
  id: string;
  body: string;
  username: string;
  userId: string;
  parentId: string | null | undefined;
  createdAt: string;
  designation: string;
  likes: Array<string>;
}
export interface activeCommentsDataType {
  id: string;
  type: string;
}

const Comments: React.FC<CommentsProps> = ({ entityId }) => {
  console.log(entityId);
  const { user } = useAuth();
  const { data } = useComments({
    entityId: entityId,
    entityType: 'post',
    limit: 30,
    page: 1,
  });

  return (
    <div>
      <div className="flex flex-row items-center justify-between p-0">
        <div className="flex-none grow-0 order-none pr-2">
          <Avatar name={user?.name || 'U'} size={36} />
        </div>
        <CommentForm className="w-full" entityId={entityId} />
      </div>
      <div className="border-b border-neutral-200 my-4"></div>

      {data?.length > 0 && (
        <div>
          {data.map((rootComment: any, i: any) => (
            <Comment
              key={rootComment.id || i}
              comment={rootComment}
              className=""
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;

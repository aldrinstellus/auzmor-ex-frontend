import React from 'react';
import { Comment } from './Comment';
import { CommentForm } from './CommentForm';
import { useComments } from 'queries/reaction';
import { DeltaStatic } from 'quill';
import useAuth from 'hooks/useAuth';
import Avatar from 'components/Avatar';
import { ICreated, IMyReactions } from 'pages/Feed';

interface CommentsProps {
  entityId: string;
}

export interface IComment {
  content: {
    text: string;
    html: string;
    editor: DeltaStatic;
  };
  mentions: object[];
  hashtags: string[];
  latestComments: object[];
  entityType: string;
  entityId: string;
  orgId: string;
  createdAt: string;
  updatedAt: string;
  createdBy: ICreated;
  id: string;
  myReaction: IMyReactions;
}

const Comments: React.FC<CommentsProps> = ({ entityId }) => {
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
          {data.map((rootComment: IComment, i: any) => (
            <Comment key={rootComment.id} comment={rootComment} className="" />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;

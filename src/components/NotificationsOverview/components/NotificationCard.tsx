import Card from 'components/Card';
import Divider from 'components/Divider';
import React from 'react';

type NotificationCardProps = {
  post?: string;
  image?: string;
  comment?: string;
};

const NotificationCard: React.FC<NotificationCardProps> = ({
  post,
  image = undefined,
  comment,
}) => {
  return (
    <Card className="border-neutral-200 border-1 max-w-xs">
      {/* Comment */}
      {comment && (
        <div>
          <p
            className="my-4 ml-4 text-sm text-neutral-900 font-medium line-clamp-1"
            dangerouslySetInnerHTML={{
              __html: comment,
            }}
          />
          <Divider />
        </div>
      )}
      {/* Post */}
      <div className="flex">
        {image && <img src={image} width={150} className="rounded-md" />}
        {post && (
          <p
            className="m-4 text-sm text-neutral-500 line-clamp-3"
            id="postContent"
            dangerouslySetInnerHTML={{
              __html: post,
            }}
          />
        )}
      </div>
    </Card>
  );
};

export default NotificationCard;

import Post from 'components/Post';
import { RenderQuillDelta } from 'components/RenderQuillDelta';
import { IFeed } from 'pages/Feed';
import React from 'react';
import { DeltaStatic } from 'quill';

type ActivityFeedProps = {
  activityFeed: IFeed[];
};

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activityFeed }) => {
  return (
    <div>
      {activityFeed.length > 0 ? (
        activityFeed?.map((feed) => (
          <div key={feed.uuid}>
            <Post
              content={
                <RenderQuillDelta
                  delta={JSON.parse(feed.content.editor) as DeltaStatic}
                />
              }
            />
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center mt-20">
          Feed Not Found
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;

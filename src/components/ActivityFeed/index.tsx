import Divider from 'components/Divider';
import Post from 'components/Post';
import { IFeed } from 'pages/Feed';
import React from 'react';
import SortByDropdown from './components/SortByDropdown';
import ClockIcon from 'components/Icon/components/Clock';
import FeedFilter from './components/FeedFilters';
import Button, { Size, Variant } from 'components/Button';
import Icon from 'components/Icon';

type ActivityFeedProps = {
  activityFeed: IFeed[];
};

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activityFeed }) => {
  return (
    <div className="mt-10">
      <div className="flex flex-row items-center gap-x-2">
        <FeedFilter name="Filters" />
        <ClockIcon />
        <Divider />
        <SortByDropdown />
      </div>
      <div className="mt-8">
        {activityFeed.length > 0 ? (
          activityFeed.map((feed) => (
            <div key={feed.uuid} className="space-y-4">
              {feed?.isAnnouncement && (
                <div className="flex justify-between items-center bg-blue-700 -mb-4 p-2 rounded-t-9xl">
                  <div className="flex justify-center items-center text-white text-xs font-bold space-x-4">
                    <div>
                      <Icon name="flashIcon" />
                    </div>
                    <div>Announcement</div>
                  </div>
                  <Button
                    className="text-sm font-bold"
                    label={'Mark as read'}
                    size={Size.Small}
                    variant={Variant.Tertiary}
                    onClick={() => {}}
                  />
                </div>
              )}
              <Post data={feed} />
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center mt-20">
            Feed Not Found
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;

import Button, { Variant } from 'components/Button';
import Card from 'components/Card';
import Icon from 'components/Icon';
import Post from 'components/Post';
import React from 'react';

export interface IAnnouncementCardProps {
  image?: string;
  activityFeed: any;
}

const AnnouncementCard: React.FC<IAnnouncementCardProps> = ({
  image = '',
  activityFeed,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-base font-bold">Announcements</div>
        <div className="text-sm font-bold">View All</div>
      </div>
      <div className="bg-blue-700 text-white rounded-t-9xl flex space-x-4">
        <div>
          <Icon name="flashIcon" />
        </div>
        <div className="text-sm font-bold p-3">Announcement</div>
      </div>
      <div>
        <Card className="pb-10 flex flex-col items-center">
          <div className="flex flex-col justify-center items-center">
            <div>
              {activityFeed?.length > 0 ? (
                activityFeed.map((feed: any) => (
                  <>
                    {feed?.isAnnouncement && (
                      <div key={feed.uuid} className="space-y-4">
                        <Post data={feed} className="shadow-none" />
                      </div>
                    )}
                  </>
                ))
              ) : (
                <div className="flex justify-center items-center mt-20">
                  Feed Not Found
                </div>
              )}
            </div>
          </div>
          <div>
            <Button
              label="Mark as read"
              variant={Variant.Secondary}
              className="border-2 border-neutral-200 w-60 mt-4"
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnnouncementCard;

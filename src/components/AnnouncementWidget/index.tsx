import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import Card from 'components/Card';
import {
  announcementRead,
  fetchAnnouncement,
  useAnnouncements,
} from 'queries/post';
import Button, { Variant } from 'components/Button';
import useAuth from 'hooks/useAuth';
import Avatar from 'components/Avatar';
import Icon from 'components/Icon';

export interface IAnnouncementCardProps {}

const AnnouncementCard: React.FC<IAnnouncementCardProps> = () => {
  const acknowledgeAnnouncement = useMutation({
    mutationKey: ['acknowledgeAnnouncement'],
    mutationFn: announcementRead,
    onError: (error) => console.log(error),
    onSuccess: (data, variables, context) => {
      console.log('data==>', data);
    },
  });

  const { data, isLoading } = useAnnouncements();

  const { user } = useAuth();

  return (
    <div>
      <div className="flex justify-between items-center mt-4">
        <div className="text-base font-bold">Announcements</div>
        <div className="text-sm font-bold">View All</div>
      </div>
      <div>
        <Card className="pb-6 flex flex-col items-center rounded-9xl">
          <div className="rounded-t-9xl bg-blue-700 text-white text-xs font-bold py-3 w-full flex justify-start space-x-4 px-3">
            <div>
              <Icon name="flashIcon" />
            </div>
            <div className="text-xs font-bold">Announcement</div>
          </div>
          {/* <div className="flex justify-center items-center text-white text-xs font-bold space-x-4 py-3 bg-blue-700">
          </div> */}
          <div className="px-6 pt-5 flex flex-col items-center">
            <div className="flex justify-center items-center space-x-3">
              <div>
                <Avatar name={user?.name || ''} image="" />
              </div>
              <div>
                {user?.name}
                Shared a post
                <div className="">
                  {data?.data?.result?.data[0].createdAt}ago
                </div>
              </div>
            </div>
            <div className="mt-5">
              {data?.data?.result?.data[0]?.content?.text}
            </div>
          </div>
          <Button
            label="Mark as read"
            variant={Variant.Tertiary}
            className="border-2 border-neutral-200 mt-4"
            onClick={() => {
              acknowledgeAnnouncement.mutate({
                entityId: data?.data?.result?.data[0].id,
                entityType: 'post',
                type: 'acknowledge',
                reaction: 'mark_read',
              });
            }}
          />
        </Card>
      </div>
    </div>
  );
};

export default AnnouncementCard;

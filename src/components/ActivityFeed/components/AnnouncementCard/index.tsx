import Avatar from 'components/Avatar';
import Card from 'components/Card';
import useAuth from 'hooks/useAuth';
import React from 'react';

export interface IAnnouncementCardProps {
  // name: string;
  image?: string;
}

const AnnouncementCard: React.FC<IAnnouncementCardProps> = ({ image = '' }) => {
  const { user } = useAuth();

  return (
    <div>
      <div className="flex justify-between items-center">
        <div>Announcements</div>

        <div>View All</div>
      </div>
      <div className="bg-blue-700 text-white">Announcement</div>
      <div>
        <Card>
          <div className="flex flex-col justify-center items-center w-[200px] h-[200px]">
            <Avatar name={user?.name} image={image} />
            <div>{user?.name}</div>
          </div>
          <div>Mark as read</div>
        </Card>
      </div>
    </div>
  );
};

export default AnnouncementCard;

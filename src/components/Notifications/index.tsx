import Card from 'components/Card';
import Divider from 'components/Divider';
import HorizontalMenu from 'components/HorizontalMenu';
import Icon from 'components/Icon';
import React from 'react';

type Notification = {
  content: string;
};

type NotificationProps = {
  notifications?: Notification[];
};

const Notifications: React.FC<NotificationProps> = () => {
  const notificationMenuItems = [
    {
      label: 'All',
      id: 'all',
    },
    {
      label: 'Mentions',
      id: 'mentions',
    },
  ];
  return (
    <Card className="absolute w-96 right-3 ">
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between">
        <p className="text-gray-900 font-extrabold text-base">Notifications</p>
        {/* Mark all as read */}
        <div className="flex items-center gap-x-1 cursor-pointer">
          <Icon name="checkbox" stroke="#059669" size={18} />
          <p className="text-primary-600 font-bold text-sm">Mark all as read</p>
        </div>
      </div>
      {/* Content */}
      <Divider />
      <HorizontalMenu items={notificationMenuItems} />
      <Divider />
      <div className="px-6 flex flex-col max-h-96 overflow-y-auto"></div>
      <Divider className="!bg-gray-100" />
      <div className="text-neutral-500 text-sm font-normal flex justify-center py-4">
        That&apos;s all for now
      </div>
      <div className="px-6 bg-blue-100 text-sm font-normal flex items-center justify-start py-4 rounded-b-9xl">
        <p className="text-neutral-900 font-bold text-base cursor-pointer">
          View All
        </p>
      </div>
    </Card>
  );
};

export default Notifications;

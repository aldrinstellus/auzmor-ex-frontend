import React from 'react';
import Avatar from 'components/Avatar';
import Icon from 'components/Icon';
import { getIconForAction } from '../utils/learnNotification';

// Define the types for the props
type EventNotificationProps = {
  source: 'user' | 'system';
  actionType: string;
  userImageUrl?: string;
  name?: string;
  profileColor?: string;
};

const EventNotification: React.FC<EventNotificationProps> = ({
  source,
  actionType,
  userImageUrl,
  name,
  profileColor,
}) => {
  console.log('actionType :', actionType);
  return (
    <div className="relative">
      {source === 'user' && (
        <div className="relative w-[50px]">
          <Avatar
            name={name || ''}
            image={userImageUrl}
            size={50}
            className={`bg-${profileColor}`}
          />
          <Icon
            name={getIconForAction(actionType) || ''}
            className="absolute z-50 rounded-full cursor-pointer bottom-0 right-0 -mr-2 -mb-2"
          />
        </div>
      )}
      {source === 'system' && (
        <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center">
          <Icon
            name={getIconForAction(actionType) || ''}
            className="w-[50px] h-[50px] min-w-[50px] min-h-[50px]"
          />
        </div>
      )}
    </div>
  );
};

export default EventNotification;

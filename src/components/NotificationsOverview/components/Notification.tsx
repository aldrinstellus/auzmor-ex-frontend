import Avatar from 'components/Avatar';
import React, { ReactElement } from 'react';
import NotificationCard from './NotificationCard';
import {
  getNotificationMessage,
  getNotificationCardContent,
  getTimeSinceActedAt,
} from '../utils';
import { NotificationProps, TargetType } from './NotificationsList';

type NotificationCardProps = NotificationProps;

const Notification: React.FC<NotificationCardProps> = ({
  actor,
  action,
  target,
  isRead,
  message,
}): ReactElement => {
  const notificationMessage = getNotificationMessage(
    actor.fullName,
    action.type,
    target[target.length - 1].type,
  );

  const cardContent = getNotificationCardContent(action, target);

  return (
    <div
      className={`${
        !isRead ? 'bg-orange-50' : 'bg-white'
      } py-4 px-6 cursor-pointer`}
    >
      <div className="flex gap-x-4 items-start">
        {/* Avatar of the actor with indicator */}
        <Avatar
          name={actor.fullName}
          image={actor.profileImage?.original}
          indicatorIcon={
            <div className="bg-green-400 rounded-full w-3 h-3 top-0 right-0 absolute" />
          }
          size={40}
        />
        {/* Content */}
        <div className="flex items-start justify-between w-full">
          <div className="flex flex-col gap-y-1 w-11/12">
            <p className="text-neutral-900">{notificationMessage}</p>
            <p className="text-sm text-neutral-500 font-normal">
              {getTimeSinceActedAt(action.actedAt)}
            </p>
            <NotificationCard
              TopCardContent={cardContent?.TopCardContent}
              BottomCardContent={cardContent?.BottomCardContent}
              image={cardContent?.image}
            />
          </div>
          {/* Unread indicator (orange dot) */}
          {!isRead && (
            <div className="bg-orange-400 rounded-full w-2 h-2 mt-2" />
          )}
        </div>

        <div />
      </div>
    </div>
  );
};

export default Notification;

import Avatar from 'components/Avatar';
import React, { ReactElement } from 'react';
import NotificationCard from './NotificationCard';
import {
  getNotificationMessage,
  getTargetContentByTargetType,
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
        <div className="flex items-start gap-x-3">
          <div className="flex flex-col gap-y-1">
            <p className="text-neutral-900">
              {actor.fullName}{' '}
              {getNotificationMessage(
                action.type,
                target[target.length - 1].type,
                actor.fullName,
              )}
            </p>
            <p className="text-sm text-neutral-500 font-normal">
              {getTimeSinceActedAt(action.actedAt)}
            </p>
            <NotificationCard
              post={
                getTargetContentByTargetType(target, TargetType.POST)?.content
              }
              comment={
                getTargetContentByTargetType(target, TargetType.COMMENT)
                  ?.content
              }
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

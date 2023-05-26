import UserCard from 'components/UserWidget';
import React, { ReactElement, ReactNode, useState } from 'react';
import NotificationSettingsCard from './components/NotificationSettingsCard';
import Card from 'components/Card';
import Button, { Variant } from 'components/Button';
import NotificationsList from 'components/NotificationsOverview/components/NotificationsList';

enum NotificationType {
  ALL = 'ALL',
  MENTIONS = 'MENTIONS',
  CHANNELS = 'CHANNELS',
}

type NotificationButtonGroup = {
  label: string;
  type: NotificationType;
  component: ReactNode;
  disabled: boolean;
};

const buttonGroup = [
  {
    label: 'All',
    type: NotificationType.ALL,
    component: <NotificationsList />,
    disabled: false,
  },
  {
    label: 'Mentions',
    type: NotificationType.MENTIONS,
    component: <NotificationsList mentions />,
    disabled: false,
  },
  {
    label: 'Channels',
    type: NotificationType.CHANNELS,
    component: <NotificationsList />,
    disabled: true,
  },
];

const Notifications: React.FC = (): ReactElement => {
  const [notificationsList, setNotificationsList] =
    useState<NotificationButtonGroup>(buttonGroup[0]);

  return (
    <>
      <div className="mb-12 space-x-8 flex w-full">
        <div className="sticky top-10 z-10 w-1/4">
          <UserCard />
        </div>
        <div className="w-1/2">
          <div className="mt-4">
            <Card className="p-6">
              <div className="flex flex-col">
                <p className="text-2xl text-neutral-900 font-bold">
                  Notifications
                </p>
                <div className="flex gap-x-3 pt-6">
                  {buttonGroup.map((button, index) => (
                    <Button
                      label={button.label}
                      variant={Variant.Secondary}
                      key={button.type}
                      disabled={button.disabled}
                      onClick={() => setNotificationsList(buttonGroup[index])}
                      className={`${
                        notificationsList.type === button.type
                          ? '!text-primary-600'
                          : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </div>
          <div className="mt-4">{notificationsList.component}</div>
        </div>
        <div className="w-1/4">
          <NotificationSettingsCard />
        </div>
      </div>
    </>
  );
};

export default Notifications;

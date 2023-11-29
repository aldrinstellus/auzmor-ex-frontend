import { FC } from 'react';
import clsx from 'clsx';
import SwitchToggle from 'components/SwitchToggle';
import { INotificationSettings } from 'queries/users';

type AppProps = {
  settingsKey: 'post' | 'mentions';
  isLoading: boolean;
  data?: INotificationSettings;
  onChange: (updatedData: INotificationSettings, reset: () => void) => void;
};

const settings = {
  post: [
    {
      label: 'Someone comments on my posts',
      key: 'myPostComment',
    },
    {
      label: 'Someone reacts on my posts',
      key: 'myPostReact',
    },
    {
      label: 'Someone gives me a kudos',
      key: 'myPostKudos',
    },
    {
      label: 'Someone comments on a post I am subscribed to',
      key: 'postSubscribedComment',
    },
  ],

  mentions: [
    {
      label: 'Someone mentions me in a post',
      key: 'mentionPost',
    },
    {
      label: 'Someone mentions me in a comment',
      key: 'mentionComment',
    },
    {
      label: 'Someone comments on a post I am subscribed to',
      key: 'mentionSubscribedComment',
    },
  ],
};

const NotificationSettingsList: FC<AppProps> = ({
  settingsKey,
  isLoading,
  data,
  onChange,
}) => {
  return (
    <div className="px-6 py-4">
      <div className="flex text-sm font-bold text-neutral-700 mb-4">
        <div className="flex-1">Actions</div>
        <div className="w-[144px] flex justify-between">
          <div className="">In app</div>
          <div>Email</div>
        </div>
      </div>
      {settings[settingsKey].map((setting, idx: number) => (
        <div
          key={setting.label}
          className={clsx('flex text-sm text-neutral-900 py-3', {
            'border-b border-neutral-200':
              idx !== settings[settingsKey].length - 1,
          })}
        >
          <div className="flex-1">{setting.label}</div>
          <div className="w-[144px] flex justify-between">
            <SwitchToggle
              onChange={(
                checked: boolean,
                setChecked: (checked: boolean) => void,
              ) => {
                onChange(
                  {
                    ...data,
                    [settingsKey]: {
                      ...data?.[settingsKey],
                      app: {
                        ...data?.[settingsKey]?.app,
                        [setting.key]: checked,
                      },
                    },
                  },
                  () => setChecked(!checked),
                );
              }}
              disabled={isLoading}
              defaultValue={!!data?.[settingsKey]?.app?.[setting.key]}
              dataTestId={`notificationSettings-${settingsKey}-app-${setting.key}`}
            />
            <SwitchToggle
              onChange={(
                checked: boolean,
                setChecked: (checked: boolean) => void,
              ) => {
                onChange(
                  {
                    ...data,
                    [settingsKey]: {
                      ...data?.[settingsKey],
                      email: {
                        ...data?.[settingsKey]?.email,
                        [setting.key]: checked,
                      },
                    },
                  },
                  () => setChecked(!checked),
                );
              }}
              disabled={isLoading}
              defaultValue={!!data?.[settingsKey]?.email?.[setting.key]}
              dataTestId={`notificationSettings-${settingsKey}-email-${setting.key}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationSettingsList;

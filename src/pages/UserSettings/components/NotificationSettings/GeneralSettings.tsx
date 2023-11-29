import Accordion from 'components/Accordion';
import queryClient from 'utils/queryClient';
import NotificationSettingsList from './NotificationSettingsList';
import {
  INotificationSettings,
  IUserSettings,
  updateUserSettings,
} from 'queries/users';
import useAuth from 'hooks/useAuth';
import { useMutation } from '@tanstack/react-query';

const GeneralSetting = () => {
  const { user, updateUser } = useAuth();

  const updateMutation = useMutation({
    mutationKey: ['update-user-settings'],
    mutationFn: (data: IUserSettings) => updateUserSettings(data),
  });

  const { notificationSettings } = user || {};

  const handleChange = (
    updatedNotificationSettings: INotificationSettings,
    reset: () => void,
  ) => {
    console.log({ updatedNotificationSettings });
    updateMutation.mutate(
      { notificationSettings: updatedNotificationSettings },
      {
        onError: reset,
        onSuccess: async () => {
          await queryClient.invalidateQueries(['current-user-me']);
          updateUser({
            ...user!,
            notificationSettings: updatedNotificationSettings,
          });
        },
      },
    );
  };

  return (
    <div className="space-y-4">
      <Accordion
        title="Posts"
        content={
          <NotificationSettingsList
            settingsKey="post"
            isLoading={updateMutation.isLoading}
            data={notificationSettings}
            onChange={handleChange}
          />
        }
      />
      <Accordion
        title="Mentions"
        content={
          <NotificationSettingsList
            settingsKey="mentions"
            isLoading={updateMutation.isLoading}
            data={notificationSettings}
            onChange={handleChange}
          />
        }
      />
    </div>
  );
};

export default GeneralSetting;

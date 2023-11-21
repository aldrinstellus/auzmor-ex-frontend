import Card from 'components/Card';
import Divider from 'components/Divider';
import Icon from 'components/Icon';
import SSOSettings from 'components/SSOSettings';
import { useOrganization } from 'queries/organization';
import { FC, useMemo, useState } from 'react';
import GeneralSettings from './GeneralSettings';

const Admin: FC = () => {
  const { data, isLoading } = useOrganization();
  const settings = useMemo(
    () => [
      {
        label: 'General settings',
        icon: 'gearOutline',
        key: 'general-settings',
        component: <GeneralSettings />,
        disabled: false,
        hidden: false,
        dataTestId: 'adminsettings-generalsetting',
      },
      {
        label: 'User Management',
        icon: 'userManagement',
        key: 'user-management-settings',
        component: <div>User Management Settings Page</div>,
        disabled: false,
        hidden: true,
        dataTestId: 'settings-user-management',
      },
      {
        label: 'Branding',
        icon: 'branding',
        key: 'branding-settings',
        component: <div>Branding Settings Page</div>,
        disabled: false,
        hidden: false,
        dataTestId: 'settings-branding',
      },
      {
        label: 'Single Sign-on',
        icon: 'link',
        key: 'single-sign-on-settings',
        component: <SSOSettings />,
        disabled: false,
        hidden: false,
        dataTestId: 'settings-sso',
      },
      {
        label: 'Marketplace',
        icon: 'marketplace',
        key: 'marketplace-settings',
        component: <div>Marketplace Settings Page</div>,
        disabled: false,
        hidden: true,
        dataTestId: 'settings-marketplace',
      },
      {
        label: 'Notifications',
        icon: 'notification',
        key: 'notifications-settings',
        component: <div>Notifications Settings Page</div>,
        disabled: false,
        hidden: true,
        dataTestId: 'settings-notifications',
      },
    ],
    [data, isLoading],
  );

  const [activeSettingsIndex, setActiveSettingsIndex] = useState<number>(0);

  const visibleSettings = settings.filter((item) => !item.hidden);

  return (
    <div
      className="flex justify-between w-full gap-x-14"
      data-testid="admin-settings"
    >
      <Card
        className="min-w-[300px] h-full"
        dataTestId="admin-settings-controls"
      >
        <p className="text-neutral-900 text-base font-bold p-4">
          Admin Settings
        </p>
        <Divider className="border-neutral-500" />
        <div className="flex flex-col">
          {visibleSettings.map((item, index) => (
            <div
              key={item.key}
              className={`hover:bg-primary-50 cursor-pointer ${
                item.key === visibleSettings[activeSettingsIndex].key
                  ? 'bg-primary-50'
                  : 'bg-white'
              } ${index === visibleSettings.length - 1 ? 'rounded-b-9xl' : ''}`}
              onClick={() => setActiveSettingsIndex(index)}
              data-testid={item.dataTestId}
            >
              <div
                className={`${
                  item.key === visibleSettings[activeSettingsIndex].key
                    ? 'text-primary-500'
                    : 'text-neutral-900'
                } text-sm font-medium p-4 flex items-center gap-x-3`}
              >
                <Icon
                  name={item.icon}
                  isActive={
                    visibleSettings[activeSettingsIndex].key === item.key
                  }
                />
                {item.label}
              </div>
              {index !== visibleSettings.length - 1 && <Divider />}
            </div>
          ))}
        </div>
      </Card>
      <div className="flex flex-col w-full gap-y-4">
        <Card className="max-h-14 text-neutral-900 text-base font-bold py-4 pl-6">
          {visibleSettings[activeSettingsIndex].label}
        </Card>
        {visibleSettings[activeSettingsIndex].component}
      </div>
    </div>
  );
};

export default Admin;

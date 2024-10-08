import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Logo } from 'components/Logo';
import Icon from 'components/Icon';

import './style.css';
import PopupMenu from 'components/PopupMenu';

interface INavbarLxpProps {}

const AdminNavbar: FC<INavbarLxpProps> = ({}) => {
  const { t } = useTranslation('navbar');

  const navbarMenu = [
    {
      id: 'home',
      label: t('learn.home'),
      to: '/',
      show: true,
      options: [],
    },
    {
      id: 'engage',
      label: t('learn.engage'),
      to: '',
      show: true,
      options: [
        {
          id: 'feed',
          label: t('feed'),
          to: '/feed',
          show: true,
        },
        {
          id: 'channels',
          label: t('channels'),
          to: '/channels',
          show: true,
        },
      ],
    },
    {
      id: 'training',
      label: t('learn.training'),
      to: '',
      show: true,
      options: [
        {
          id: 'courses',
          label: t('learn.courses'),
          to: '/courses',
          show: true,
        },
        {
          id: 'paths',
          label: t('learn.paths'),
          to: '/paths',
          show: true,
        },
        {
          id: 'events',
          label: t('learn.events'),
          to: '/events',
          show: true,
        },
        {
          id: 'external',
          label: t('learn.external'),
          to: '/external-trainings',
          show: true,
        },
      ],
    },
    {
      id: 'learningCenter',
      label: t('learn.learningCenter'),
      to: '',
      show: true,
      options: [
        {
          id: 'feed',
          label: t('feed'),
          to: '/feed',
          show: true,
        },
        {
          id: 'channels',
          label: t('channels'),
          to: '/channels',
          show: true,
        },
      ],
    },
    {
      id: 'forums',
      label: t('learn.forums'),
      to: '/',
      show: true,
      options: [],
    },
    {
      id: 'company',
      label: t('learn.company'),
      to: '',
      show: true,
      options: [
        {
          id: 'feed',
          label: t('feed'),
          to: '/feed',
          show: true,
        },
        {
          id: 'channels',
          label: t('channels'),
          to: '/channels',
          show: true,
        },
      ],
    },
    {
      id: 'analytics',
      label: t('learn.analytics'),
      to: '',
      show: true,
      options: [
        {
          id: 'feed',
          label: t('feed'),
          to: '/feed',
          show: true,
        },
        {
          id: 'channels',
          label: t('channels'),
          to: '/channels',
          show: true,
        },
      ],
    },
    {
      id: 'ecommerce',
      label: t('learn.ecommerce'),
      to: '',
      show: true,
      options: [
        {
          id: 'feed',
          label: t('feed'),
          to: '/feed',
          show: true,
        },
        {
          id: 'channels',
          label: t('channels'),
          to: '/channels',
          show: true,
        },
      ],
    },
  ];

  return (
    <div className="h-[78px] flex items-center justify-center bg-white px-14">
      <div className="w-full max-w-[1440px] flex items-center">
        <Logo />
        <div className="ml-[26px] flex items-center gap-[16px]">
          {navbarMenu
            .filter((item) => item.show)
            .map((item) =>
              item.options.length > 0 ? (
                <div className="relative" key={item.id}>
                  <PopupMenu
                    triggerNode={
                      <div
                        tabIndex={0}
                        className="px-[10px] py-[4px] cursor-pointer flex items-center transition ease duration-150 hover:text-primary-500 multi-navitem"
                      >
                        <span className="text-[15px]">{item.label}</span>
                        <Icon
                          name="arrowDown2"
                          size={24}
                          dataTestId={`${item.id}-collapse`}
                        />
                      </div>
                    }
                    menuItems={item.options}
                    className="mt-1 right-0 border-1 border-neutral-200 focus-visible:outline-none"
                  />
                </div>
              ) : (
                <NavLink
                  to={item.to}
                  key={item.id}
                  className="text-[15px] px-[10px] py-[4px] transition ease duration-150 hover:text-primary-500"
                >
                  {item.label}
                </NavLink>
              ),
            )}
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;

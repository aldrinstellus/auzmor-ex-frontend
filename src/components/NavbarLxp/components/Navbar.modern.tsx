import Icon from 'components/Icon';
import { Logo } from 'components/Logo';
import PopupMenu from 'components/PopupMenu';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import './style.css';
import { getLearnUrl } from 'utils/misc';

interface INavbarLxpProps {}

const Navbar: FC<INavbarLxpProps> = ({}) => {
  const { t } = useTranslation('navbar');
  const navbarMenu = [
    {
      id: 'home',
      label: t('learn.home'),
      to: '/user/feed',
      icon: 'home',
      show: true,
      options: [],
    },
    {
      id: 'channels',
      label: t('learn.channels'),
      to: '/user/channels',
      show: true,
      icon: 'exploreOutline',
      options: [],
    },
    {
      id: 'training',
      label: t('learn.training'),
      to: '',
      show: true,
      icon: 'training',
      options: [
        {
          id: 'myLearning',
          label: t('learn.myLearning'),
          onClick: () => window.location.replace(`${getLearnUrl('/user')}`),
          show: true,
        },
        {
          id: 'allTrainings',
          label: t('learn.allTrainings'),
          onClick: () =>
            window.location.replace(`${getLearnUrl('/user/trainings')}`),
          show: true,
        },
      ],
    },
    {
      id: 'learningCenter',
      label: t('learn.learningCenter'),
      to: '',
      show: true,
      icon: 'learningCenter',
      options: [
        {
          id: 'tasks',
          label: t('learn.tasks'),
          onClick: () =>
            window.location.replace(`${getLearnUrl('/user/tasks')}`),
          show: true,
        },
        {
          id: 'mentorship',
          label: t('learn.mentorship'),
          onClick: () =>
            window.location.replace(`${getLearnUrl('/mentorship/overview')}`),
          show: true,
        },
        {
          id: 'forums',
          label: t('learn.forums'),
          onClick: () =>
            window.location.replace(`${getLearnUrl('/user/forums')}`),
          show: true,
        },
      ],
    },
  ];
  return (
    <div className="h-[78px] flex items-center justify-center bg-white px-14">
      <div className="w-full max-w-[1440px] flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-[24px]">
          {navbarMenu
            .filter((item) => item.show)
            .map((item) =>
              item.options.length > 0 ? (
                <div className="relative" key={item.id}>
                  <PopupMenu
                    triggerNode={
                      <div
                        tabIndex={0}
                        className="nav-item px-[10px] py-[4px] cursor-pointer flex items-center transition ease duration-150 hover:text-primary-500 multi-navitem"
                      >
                        <Icon
                          name={item.icon}
                          size={18}
                          dataTestId={`${item.id}-collapse`}
                        />
                        <span className="text-[15px] ml-[8px]">
                          {item.label}
                        </span>
                        <Icon
                          name="arrowDown2"
                          size={20}
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
                  className="nav-item text-[15px] px-[10px] py-[4px] gap-[8px] transition ease duration-150 hover:text-primary-500 flex items-center"
                >
                  <Icon
                    name={item.icon}
                    size={item.id === 'channels' ? 22 : 18}
                    dataTestId={`${item.id}-collapse`}
                  />
                  {item.label}
                </NavLink>
              ),
            )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

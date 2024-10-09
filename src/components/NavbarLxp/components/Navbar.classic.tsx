import { Logo } from 'components/Logo';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { getLearnUrl } from 'utils/misc';

interface INavbarLxpProps {}

const Navbar: FC<INavbarLxpProps> = ({}) => {
  const { t } = useTranslation('navbar');
  const navbarMenu = [
    {
      id: 'home',
      label: t('learn.home'),
      to: '/user/feed',
      show: true,
    },
    {
      id: 'channels',
      label: t('learn.channels'),
      to: '/user/channels',
      show: true,
    },
    {
      id: 'myLearning',
      label: t('learn.myLearning'),
      to: `${getLearnUrl('/user')}`,
      show: true,
    },
    {
      id: 'courses',
      label: t('learn.courses'),
      to: `${getLearnUrl('/user/courses')}`,
      show: true,
    },
    {
      id: 'paths',
      label: t('learn.paths'),
      to: `${getLearnUrl('/user/paths')}`,
      show: true,
    },
    {
      id: 'events',
      label: t('learn.events'),
      to: `${getLearnUrl('/user/events')}`,
      show: true,
    },
    {
      id: 'tasks',
      label: t('learn.tasks'),
      to: `${getLearnUrl('/user/tasks')}`,
      show: true,
    },
    {
      id: 'mentorship',
      label: t('learn.mentorship'),
      to: `${getLearnUrl('/user/mentorship/overview')}`,
      show: true,
    },
    {
      id: 'forums',
      label: t('learn.forums'),
      to: `${getLearnUrl('/user/forums')}`,
      show: true,
    },
  ];
  return (
    <div className="h-[78px] flex items-center justify-center bg-white px-14">
      <div className="w-full max-w-[1440px] flex items-center">
        <Logo />
        <div className="ml-[26px] flex items-center gap-[16px]">
          {navbarMenu
            .filter((item) => item.show)
            .map((item) => (
              <NavLink
                to={item.to}
                key={item.id}
                className="nav-item text-[15px] px-[10px] py-[4px] gap-[8px] transition ease duration-150 hover:text-primary-500 flex items-center"
              >
                {item.label}
              </NavLink>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

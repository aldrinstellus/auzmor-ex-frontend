import React from 'react';

import ExBrandWordmark from 'images/Wordmark.svg';
import { NavLink } from 'react-router-dom';

const navigations = [
  {
    tab: 'Home',
    icon: 1,
    linkTo: '/home',
  },
  {
    tab: 'Feed',
    icon: 2,
    linkTo: '/feed',
  },
  {
    tab: 'People',
    icon: 3,
    linkTo: '/users',
  },
  {
    tab: 'Apps',
    icon: 4,
    linkTo: '/home',
  },
  {
    tab: 'Discover',
    icon: 5,
    linkTo: '/home',
  },
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 scroll-smooth">
      {/* add media query classes - make it responsiveness */}
      <div className="bg-white shadow h-16 w-full flex items-center ">
        <div className="mx-8">
          <img src={ExBrandWordmark} alt="Ex Brand Wordmark" />
        </div>
        <div className="grow-0">
          {/* Replace with Component library */}
          <div className="w-120 border border-1 border-solid py-2 rounded-full flex justify-between">
            <span className="ml-5 font-grey-300">
              Search name, channel, page, document etc.,
            </span>
            <span className="mr-5">Q</span>
          </div>
        </div>
        <nav className="mx-10">
          <div className="flex gap-x-10">
            {navigations.map((nav) => (
              <NavLink to={nav.linkTo} key={nav.tab}>
                <div className="flex flex-col items-center">
                  <span>{nav.icon}</span>
                  <div>{nav.tab}</div>
                </div>
              </NavLink>
            ))}
          </div>
        </nav>
        {/* replace with divider component library */}
        <div className="divide-x-4">
          <div>|</div>
        </div>
        <div className="flex items-center gap-x-10 mx-10">
          <NavLink to="/login">
            <div className="flex flex-col items-center">
              <span>6</span>
              <div>Admin</div>
            </div>
          </NavLink>
          {/* replace with component library - Notification Icon */}
          <span>{'<3'}</span>
          {/* replace with component library (dropdown) - avatar component */}
          <span>Avatar</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

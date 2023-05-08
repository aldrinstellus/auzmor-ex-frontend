import React, { ReactElement } from 'react';
import OnboardWelcome from 'images/onboard-welcome.png';

const WelcomeScreen: React.FC = (): ReactElement => {
  return (
    <div className="flex items-center flex-col justify-between gap-y-4 px-10">
      <img src={OnboardWelcome} />
      <p className="font-bold text-neutral-900 text-2xl">
        Welcome to Auzmor Office
      </p>
      <p className="font-normal text-sm text-neutral-500">
        Let&rsquo;s get your profile setup so that you can jump right in and
        start using Auzmor office.
      </p>
    </div>
  );
};

export default WelcomeScreen;

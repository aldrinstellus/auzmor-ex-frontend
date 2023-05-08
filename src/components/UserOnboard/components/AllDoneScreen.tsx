import React, { ReactElement } from 'react';
import OnboardFinish from 'images/onboard-finish.png';

const AllDoneScreen: React.FC = (): ReactElement => {
  return (
    <div className="flex items-center flex-col justify-between gap-y-4 px-10">
      <img src={OnboardFinish} />
      <p className="font-bold text-neutral-900 text-2xl">All Done!</p>
      <p className="font-normal text-sm text-neutral-500">
        You are all set to start using Auzmor office
      </p>
    </div>
  );
};

export default AllDoneScreen;

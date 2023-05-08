import React, { ReactElement } from 'react';
import ProfileSetupModal, {
  BackButtonAction,
} from './components/ProfileSetupModal';
import WelcomeScreen from './components/WelcomeScreen';
import EditProfileScreen from './components/EditProfileScreen';
import SelectTimezoneScreen from './components/SelectTimezoneScreen';
import AllDoneScreen from './components/AllDoneScreen';

type UserOnboardProps = {
  name?: string;
};

const UserOnboard: React.FC<UserOnboardProps> = ({ name }): ReactElement => {
  const screens = [
    {
      screen: <WelcomeScreen />,
    },
    {
      screen: <EditProfileScreen />,
      backText: 'Skip this step',
      backButtonAction: BackButtonAction.SKIP,
    },
    {
      screen: <SelectTimezoneScreen />,
    },
    {
      screen: <AllDoneScreen />,
      nextText: 'Launch Auzmor Office',
      cardText: `You're all set`,
    },
  ];

  return <ProfileSetupModal screens={screens} />;
};

export default UserOnboard;

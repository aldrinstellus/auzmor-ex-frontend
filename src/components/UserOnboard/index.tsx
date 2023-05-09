import React, { ReactElement } from 'react';
import ProfileSetupModal, {
  BackButtonAction,
} from './components/ProfileSetupModal';
import WelcomeScreen from './components/WelcomeScreen';
import EditProfileScreen from './components/EditProfileScreen';
import SelectTimezoneScreen from './components/SelectTimezoneScreen';
import AllDoneScreen from './components/AllDoneScreen';
import useModal from 'hooks/useModal';
import Modal from 'components/Modal';

type UserOnboardProps = {
  fullName: string;
};

const UserOnboard: React.FC<UserOnboardProps> = ({
  fullName,
}): ReactElement => {
  const [open, openModal, closeModal] = useModal(true);
  const screens = [
    {
      screen: <WelcomeScreen />,
    },
    {
      screen: <EditProfileScreen fullName={fullName} />,
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

  return (
    <Modal open={open}>
      <ProfileSetupModal closeModal={closeModal} screens={screens} />
    </Modal>
  );
};

export default UserOnboard;

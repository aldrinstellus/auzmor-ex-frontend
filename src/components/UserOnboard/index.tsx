import React, { ReactElement as ReactNode, useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import EditProfileScreen from './components/EditProfileScreen';
import SelectTimezoneScreen from './components/SelectTimezoneScreen';
import AllDoneScreen from './components/AllDoneScreen';
import useModal from 'hooks/useModal';
import Modal from 'components/Modal';
import Card from 'components/Card';
import Divider from 'components/Divider';
import Icon from 'components/Icon';
import Button from 'components/Button';
import useCarousel from 'hooks/useCarousel';

type UserOnboardProps = {
  fullName: string;
};

export enum BackButtonAction {
  BACK,
  SKIP,
}

export enum NextButtonAction {
  NEXT,
  FINISH,
}

export type IScreen = {
  screen: ReactNode;
  cardText?: string;
  backButtonText?: string;
  nextButtonText?: string;
  backButtonAction?: BackButtonAction;
  nextButtonAction?: NextButtonAction;
  onNextButtonClick?: any;
  nextButtonLoading?: boolean;
};

const UserOnboard: React.FC<UserOnboardProps> = ({ fullName }): ReactNode => {
  const [open, openModal, closeModal] = useModal(true);
  const [onNextButtonClick, setOnNextButtonClick] = useState<any>();
  const [nextButtonLoading, setNextButtonLoading] = useState<boolean>(false);

  const screens: IScreen[] = [
    {
      screen: <WelcomeScreen />,
    },
    {
      screen: <EditProfileScreen fullName={fullName} />,
      backButtonText: 'Skip this step',
      backButtonAction: BackButtonAction.SKIP,
    },
    {
      screen: <SelectTimezoneScreen />,
    },
    {
      screen: <AllDoneScreen />,
      nextButtonText: 'Launch Auzmor Office',
      cardText: `You're all set`,
      nextButtonAction: NextButtonAction.FINISH,
    },
  ];

  const [currentScreen, prev, next] = useCarousel(0, screens.length);

  return (
    <Modal open={open}>
      <Card>
        <div className="flex items-center justify-between m-4">
          <span className="font-extrabold text-lg">
            {screens[currentScreen].cardText || 'Profile Setup'}
          </span>
          <Icon
            name="close"
            fill="#000000"
            onClick={closeModal}
            hover={false}
          />
        </div>
        <Divider />
        <span className="flex items-center justify-center min-h-[450px]">
          {screens[currentScreen].screen}
        </span>
        <Divider />
        <div className="bg-blue-50">
          <div className="px-4 py-4 flex items-center justify-between">
            <div
              className="font-bold text-neutral-900 cursor-pointer"
              onClick={() => {
                if (
                  screens[currentScreen]?.backButtonAction ===
                  BackButtonAction.SKIP
                ) {
                  next();
                } else {
                  prev();
                }
              }}
            >
              {screens[currentScreen].backButtonText}
            </div>
            <Button
              className="font-bold"
              label={screens[currentScreen].nextButtonText || 'Next'}
              loading={nextButtonLoading}
              onClick={() => {
                if (
                  screens[currentScreen]?.nextButtonAction ===
                  NextButtonAction.FINISH
                ) {
                  closeModal();
                } else {
                  next();
                }
              }}
              disabled={nextButtonLoading}
            ></Button>
          </div>
        </div>
      </Card>
    </Modal>
  );
};

export default UserOnboard;

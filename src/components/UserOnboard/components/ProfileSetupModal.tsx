import Button from 'components/Button';
import Card from 'components/Card';
import Divider from 'components/Divider';
import Icon from 'components/Icon';
import Modal from 'components/Modal';
import useCarousel from 'hooks/useCarousel';
import useModal from 'hooks/useModal';
import React, { ReactElement, ReactNode } from 'react';

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
  backText?: string;
  nextText?: string;
  cardText?: string;
  backButtonAction?: BackButtonAction;
  nextButtonAction?: NextButtonAction;
};

type ProfileSetupModalProps = {
  screens: IScreen[];
};

const ProfileSetupModal: React.FC<ProfileSetupModalProps> = ({
  screens,
}): ReactElement => {
  const [open, openModal, closeModal] = useModal(true);
  const [currentScreen, prev, next] = useCarousel(0, screens.length);
  return (
    <Modal open={open}>
      <Card>
        <div className="flex items-center justify-between m-4">
          <span className="font-extrabold text-lg">
            {screens[currentScreen].cardText || 'Profile Setup'}
          </span>
          <Icon name="close" fill="#000000" onClick={closeModal} />
        </div>
        <Divider />
        {/* Content goes here */}
        <br />
        <br />
        <span className="flex items-center justify-center">
          {screens[currentScreen].screen}
        </span>
        <br />
        <br />
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
              {screens[currentScreen].backText}
            </div>
            <Button
              className="font-bold"
              label={screens[currentScreen].nextText || 'Next'}
              onClick={() => {
                if (
                  currentScreen === screens.length - 1 ||
                  screens[currentScreen]?.nextButtonAction ===
                    NextButtonAction.FINISH
                ) {
                  closeModal();
                } else {
                  next();
                }
              }}
            ></Button>
          </div>
        </div>
      </Card>
    </Modal>
  );
};

export default ProfileSetupModal;

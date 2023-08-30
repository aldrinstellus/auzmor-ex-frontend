import React from 'react';
import Modal from 'components/Modal';
import Header from 'components/ModalHeader';
import { CELEBRATION_TYPE } from '..';
import Button, { Size, Variant } from 'components/Button';
import User from './User';
import { useCelebrations } from 'queries/post';
import SkeletonLoader from './SkeletonLoader';

interface UpcomingCelebrationModalProps {
  open: boolean;
  closeModal: () => void;
  type: CELEBRATION_TYPE;
}

const UpcomingCelebrationModal: React.FC<UpcomingCelebrationModalProps> = ({
  open,
  closeModal,
  type,
}) => {
  const { data, isLoading } = useCelebrations();
  const formattedData = data?.pages.flatMap((page: any) => {
    return page?.data?.result?.data.map((celebration: any) => {
      try {
        return celebration;
      } catch (e) {
        console.log('Error', { celebration });
      }
    });
  });

  const modalTitle =
    type === CELEBRATION_TYPE.Birthday
      ? 'Upcoming birthdays 🎂'
      : 'Upcoming work anniversaries 🎉';
  return (
    <Modal open={open} closeModal={closeModal} className="max-w-[648px]">
      <Header title={modalTitle} onClose={closeModal} />
      <div className="max-h-[390px] overflow-y-auto px-6 w-full divide-y divide-neutral-200">
        {(() => {
          if (isLoading) {
            return (
              <>
                {[...Array(3)].map((element) => (
                  <div key={element} className="py-4">
                    <SkeletonLoader />
                  </div>
                ))}
              </>
            );
          }
          if (formattedData && formattedData.length > 0) {
            return (
              <>
                {formattedData.map((celebration) => (
                  <div className="py-4" key={celebration.featuredUser.userId}>
                    <User type={type} data={celebration} hideSendWishBtn />
                  </div>
                ))}
              </>
            );
          }
          return <></>;
        })()}
      </div>
      <div className="flex justify-end items-center h-16 px-6 py-4 bg-blue-50 rounded-b-9xl">
        <Button
          label="Close"
          variant={Variant.Secondary}
          size={Size.Small}
          className="py-[7px]"
          onClick={closeModal}
        />
      </div>
    </Modal>
  );
};

export default UpcomingCelebrationModal;

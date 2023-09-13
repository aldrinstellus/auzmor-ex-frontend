import IconButton, { Variant } from 'components/IconButton';
import Modal from 'components/Modal';
import React from 'react';

type AppProps = {
  open: boolean;
  closeModal: () => any;
};

const SocialLinksModal: React.FC<AppProps> = ({ open, closeModal }) => {
  return (
    <Modal open={open} className="max-w-2xl" dataTestId="social-link">
      <div className="flex flex-wrap items-center p-4 space-x-3 border-neutral-100 border-b-1">
        <div className="text-lg text-neutral-900 font-extrabold flex-auto">
          Add your social accounts
        </div>
        <IconButton
          onClick={closeModal}
          icon={'close'}
          dataTestId="reactivate-user-close"
          className="!flex-[0] !text-right !bg-inherit !p-1"
          color="text-neutral-900"
          variant={Variant.Primary}
        />
      </div>
    </Modal>
  );
};

export default SocialLinksModal;

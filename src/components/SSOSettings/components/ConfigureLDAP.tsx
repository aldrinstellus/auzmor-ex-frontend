import { yupResolver } from '@hookform/resolvers/yup';
import Divider from 'components/Divider';
import Icon from 'components/Icon';
import Link from 'components/Link';
import Modal from 'components/Modal';
import useModal from 'hooks/useModal';
import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

type ConfigureLDAPProps = {
  open: boolean;
  closeModal: () => void;
};

// interface IForm{
//   config
// }

const ConfigureLDAP: React.FC<ConfigureLDAPProps> = ({
  open,
  closeModal,
}): ReactElement => {
  // const { control, handleSubmit, getValues } = useForm<IForm>({
  //   resolver: yupResolver(schema),
  //   mode: 'onSubmit',
  // });

  return (
    <Modal open={open}>
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div>
          <p className="font-extrabold text-black text-lg">Active Directory</p>
          <p className="font-normal text-neutral-500 text-sm flex items-center gap-x-1">
            Seamlessly control access to anyone in your organization.
            <Link label="Learn More." />
          </p>
        </div>
        <Icon onClick={closeModal} name="close" hover={false} stroke="#000" />
      </div>

      <Divider className="!bg-neutral-100" />
      <form></form>
    </Modal>
  );
};

export default ConfigureLDAP;

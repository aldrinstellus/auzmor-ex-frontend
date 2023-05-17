import React from 'react';
import Modal from 'components/Modal';
import Header from 'components/ModalHeader';
import FilterNavigation from './FilterNavigation';
import FilterList from './FilterList';
import Button, { Variant as ButtonVariant } from 'components/Button';
import Layout, { FieldType } from 'components/Form';
import { Size as InputSize } from 'components/Input';
import { useForm } from 'react-hook-form';

export interface IFilterModalProps {
  showModal: boolean;
  closeModal: () => void;
  setShowFilterModal: (flag: boolean) => void;
}

const FilterModal: React.FC<IFilterModalProps> = ({
  showModal,
  closeModal,
  setShowFilterModal,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const close = () => {
    closeModal();
  };
  return (
    <div>
      <Modal open={showModal} closeModal={close} className="max-w-3xl">
        {/* Body */}
        <Header title="Filter by" onClose={close} />

        {/* Body */}
        <div className="flex w-full">
          <div className="w-1/3 p-6">
            <FilterNavigation />
          </div>
          <div className="2/3 p-6">
            <div>
              <Layout
                fields={[
                  {
                    type: FieldType.Input,
                    size: InputSize.Small,
                    leftIcon: 'search',
                    control,
                    name: 'search',
                    placeholder: 'Search',
                  },
                ]}
              />
            </div>
            <FilterList />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center h-16 p-6 bg-blue-50">
          <Button
            label="Clear Fiters"
            variant={ButtonVariant.Secondary}
            // disabled={inviteUsersMutation.isLoading}
            className="mr-4"
          />
          <Button
            label="Apply"
            variant={ButtonVariant.Primary}
            // disabled={inviteUsersMutation.isLoading}
            className="mr-4"
          />
        </div>
      </Modal>
    </div>
  );
};

export default FilterModal;

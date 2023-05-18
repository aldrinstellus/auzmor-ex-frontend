import React, { ReactNode, useMemo, useState } from 'react';
import Modal from 'components/Modal';
import Header from 'components/ModalHeader';
import Button, { Variant as ButtonVariant } from 'components/Button';
import Layout, { FieldType } from 'components/Form';
import { Size as InputSize } from 'components/Input';
import { useForm } from 'react-hook-form';
import Divider from 'components/Divider';
import clsx from 'clsx';

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

  type filters = {
    label: string;
    icon: string;
    key: string;
    component: ReactNode;
    disabled: boolean;
    hidden: boolean;
    search: boolean;
  };

  const radioDivStyles = useMemo(
    () =>
      clsx({
        'hover:bg-green-50 cursor-pointer': true,
      }),
    [],
  );

  const fields = [
    {
      type: FieldType.Radio,
      size: InputSize.Small,
      leftIcon: '',
      control,
      name: 'Active',
      placeholder: 'Active',
    },
    {
      type: FieldType.Radio,
      size: InputSize.Small,
      leftIcon: '',
      control,
      name: 'Is Active',
      placeholder: 'Is Active',
    },
    {
      type: FieldType.Radio,
      size: InputSize.Small,
      leftIcon: '',
      control,
      name: 'All',
      placeholder: 'All',
    },
  ];

  const statusFiltersListNode = (
    <div className="">
      <Layout fields={fields} className="" />
    </div>
  );

  const filterNavigation = [
    {
      label: 'Location',
      icon: '',
      key: 'location-filters',
      component: <div>General Settings Page</div>,
      disabled: true,
      hidden: false,
      search: true,
    },
    {
      label: 'Departments',
      icon: '',
      key: 'departments-filters',
      component: <div>User Management Settings Page</div>,
      disabled: true,
      hidden: false,
      search: true,
    },
    {
      label: 'Status',
      icon: '',
      key: 'status-filters',
      component: statusFiltersListNode,
      disabled: false,
      hidden: false,
      search: false,
    },
    {
      label: 'Reports to me',
      icon: '',
      key: 'reporting-filters',
      component: <div>Hello</div>,
      disabled: true,
      hidden: false,
      search: true,
    },
  ];

  const [activeFilter, setActiveFilter] = useState<filters>(
    filterNavigation[2],
  );
  return (
    <div>
      <Modal open={showModal} closeModal={close} className="max-w-3xl">
        {/* Body */}
        <Header title="Filter by" onClose={close} />

        {/* Body */}
        <div className="flex w-full">
          <div className="flex flex-col w-1/3 pb-64 border-r-2 border-r-neutral-200">
            <div className="border-b-2 border-b-bg-neutral-200">
              {filterNavigation.map((item, index) => (
                <div
                  key={item.key}
                  className={
                    item.disabled
                      ? 'hover:bg-green-50 cursor-pointer pointer-events-none'
                      : 'hover:bg-green-50 cursor-pointer'
                  }
                  onClick={() => setActiveFilter(item)}
                >
                  <div className="text-neutral-500 text-sm font-medium p-4 flex items-center gap-x-3">
                    {item.label}
                  </div>
                  {index !== filterNavigation.length - 1 && <Divider />}
                </div>
              ))}
            </div>
          </div>
          <div className="w-2/3">
            {activeFilter.search && (
              <div>
                <Layout
                  fields={[
                    {
                      type: FieldType.Input,
                      size: InputSize.Small,
                      leftIcon: 'search',
                      control,
                      name: 'search',
                      placeholder: 'Search members',
                    },
                  ]}
                />
              </div>
            )}
            {activeFilter.component}
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

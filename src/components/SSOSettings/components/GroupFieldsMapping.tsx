import Layout, { FieldType } from 'components/Form';
import { Variant } from 'components/Input';
import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

type GroupFieldsMappingProps = {
  groupName?: string;
  groupMemberUid?: string;
  groupObjectFilter?: string;
};

export interface IGroupFieldsMappingForm {
  groupName?: string;
  groupMemberUid?: string;
  groupObjectFilter?: string;
}

const GroupFieldsMapping: React.FC<GroupFieldsMappingProps> = ({
  groupName = '',
  groupMemberUid = '',
  groupObjectFilter = '',
}): ReactElement => {
  const { control, getValues, handleSubmit } =
    useForm<IGroupFieldsMappingForm>();

  const userFields = [
    {
      type: FieldType.Input,
      variant: Variant.Text,
      placeholder: '',
      name: 'groupName',
      label: 'Group Name',
      control,
      defaultValue: groupName,
    },
    {
      type: FieldType.Input,
      variant: Variant.Text,
      placeholder: '',
      name: 'groupMemberUid',
      label: 'Group Member UID',
      control,
      defaultValue: groupMemberUid,
    },
    {
      type: FieldType.Input,
      variant: Variant.Text,
      placeholder: '',
      name: 'groupObjectFilter',
      label: 'Group Object Filter',
      control,
      defaultValue: groupObjectFilter,
    },
  ];

  const onSubmit = () => {};

  return (
    <form className="mt-8 ml-6" onSubmit={handleSubmit(onSubmit)}>
      <Layout fields={userFields} />
    </form>
  );
};

export default GroupFieldsMapping;

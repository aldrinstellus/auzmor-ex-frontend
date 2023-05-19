import Layout, { FieldType } from 'components/Form';
import { Variant } from 'components/Input';
import React, { ReactElement } from 'react';
import { useForm } from 'react-hook-form';

type UserFieldsMappingProps = {
  username: string;
  fullName: string;
  email: string;
  title: string;
  workMobile?: string;
  userObjectFilter?: string;
};

export interface IUserFieldsMappingForm {
  username: string;
  fullName: string;
  email: string;
  title: string;
  workMobile?: string;
  userObjectFilter?: string;
}

const UserFieldsMapping: React.FC<UserFieldsMappingProps> = ({
  username = '',
  fullName = '',
  email = '',
  title = '',
  workMobile = '',
  userObjectFilter = '',
}): ReactElement => {
  const { control, getValues, handleSubmit } =
    useForm<IUserFieldsMappingForm>();

  const userFields = [
    {
      type: FieldType.Input,
      variant: Variant.Text,
      placeholder: '',
      name: 'username',
      label: 'User Name*',
      control,
      defaultValue: username,
    },
    {
      type: FieldType.Input,
      variant: Variant.Text,
      placeholder: '',
      name: 'fullName',
      label: 'Full Name*',
      control,
      defaultValue: fullName,
    },
    {
      type: FieldType.Input,
      variant: Variant.Text,
      placeholder: '',
      name: 'email',
      label: 'Email*',
      control,
      defaultValue: email,
    },
    {
      type: FieldType.Input,
      variant: Variant.Text,
      placeholder: '',
      name: 'title',
      label: 'Title*',
      control,
      defaultValue: title,
    },
    {
      type: FieldType.Input,
      variant: Variant.Text,
      placeholder: '',
      name: 'workMobile',
      label: 'Work Mobile',
      control,
      defaultValue: workMobile,
    },
    {
      type: FieldType.Input,
      variant: Variant.Text,
      placeholder: '',
      name: 'userObjectFilter',
      label: 'User Object Filter',
      control,
      defaultValue: userObjectFilter,
    },
  ];

  const onSubmit = () => {};

  return (
    <form className="mt-8 ml-6" onSubmit={handleSubmit(onSubmit)}>
      <Layout fields={userFields} />
    </form>
  );
};

export default UserFieldsMapping;

import { yupResolver } from '@hookform/resolvers/yup';
import Layout, { FieldType } from 'components/Form';
import { useLoginViaSSO } from 'queries/auth';
import { useGetSSOFromDomain } from 'queries/organization';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Variant as InputVariant } from 'components/Input';
import Button, { Type as ButtonType, Size } from 'components/Button';

export interface ILoginViaSSOProps {
  setViaSSO: (flag: boolean) => void;
}

interface IForm {
  email: string;
}

const schema = yup.object({
  email: yup
    .string()
    .email('Please enter valid email address')
    .required('Required field'),
});

const errorMappings = {
  USER_IS_DEACTIVATED: 'The email address you entered was deleted',
  USER_EMAIL_NOT_FOUND:
    "The email address you entered isn't connected to an account",
  USER_IS_NOT_ACTIVE:
    "The email address you entered isn't active. Please contact admin",
  SSO_DISABLED:
    'SSO is not configured for this email and please try entering the password',
};

const LoginViaSSO: React.FC<ILoginViaSSOProps> = ({ setViaSSO }) => {
  const {
    watch,
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const email = watch('email');

  const {
    refetch,
    isFetching,
    data: ssoResponse,
  } = useLoginViaSSO(
    { email },
    {
      enabled: false,
      onError: (error: any) => {
        setError('email', {
          type: 'custom',
          message: 'Server error, Please try again with diffrent email id',
        });
      },
      onSuccess: (data: any) => console.log(data),
    },
  );

  const onSubmit = (formData: IForm) => {
    refetch();
  };

  const getDataTestIdForValidationErrors = () => {
    const status = 'USER_IS_DEACTIVATED';
    if (status === 'USER_IS_DEACTIVATED') {
      return 'sso-deleted-email-msg';
    } else if (status === 'USER_EMAIL_NOT_FOUND') {
      return 'sso-invalid-email-msg';
    } else if (status === 'USER_IS_NOT_ACTIVE') {
      return 'sso-inactive-email-msg';
    } else if (status === 'SSO_DISABLED') {
      return 'sso-email-not-provisioned-msg';
    }
  };

  const fields = [
    {
      type: FieldType.Input,
      variant: InputVariant.Text,
      placeholder: 'Enter your email address',
      name: 'email',
      label: 'Work Email / Username',
      error: errors.email?.message,
      dataTestId: 'sso-email',
      errorDataTestId: getDataTestIdForValidationErrors(),
      control,
    },
  ];
  return (
    <div className="w-full max-w-[440px] relative h-full">
      <div className="font-extrabold text-neutral-900 text-4xl mt-20">
        Sign In via SSO
      </div>
      <form
        className="mt-32"
        onSubmit={handleSubmit(onSubmit)}
        data-testid="sso-signin-form"
      >
        <Layout fields={fields} />

        <Button
          dataTestId="sso-signin-btn"
          label={'Sign In'}
          className="w-full mt-16"
          disabled={!isValid || isFetching}
          size={Size.Large}
          type={ButtonType.Submit}
        />
      </form>
      <div className="absolute bottom-4 flex justify-center w-full">
        <div>
          <span
            className="text-primary-500 font-bold cursor-pointer"
            onClick={() => setViaSSO(false)}
            data-testid="sso-signin-cta"
          >
            Sign In
          </span>{' '}
          using Email and Password
        </div>
      </div>
    </div>
  );
};

export default LoginViaSSO;

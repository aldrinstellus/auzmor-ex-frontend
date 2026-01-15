import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import { getSubDomain, readFirstAxiosError } from 'utils/misc';
import useAuth from 'hooks/useAuth';
import { useNavigateWithToken } from 'hooks/useNavigateWithToken';
import { useTranslation } from 'react-i18next';
import useNavigate from 'hooks/useNavigation';
import { usePermissions } from 'hooks/usePermissions';
import { ApiEnum } from 'utils/permissions/enums/apiEnum';
import OfficeLogoSvg from 'components/Logo/images/OfficeLogo.svg';
import { useBrandingStore } from 'stores/branding';
import 'utils/custom-yup-validators/email/validateEmail';

interface IForm {
  email: string;
  password: string;
  domain?: string;
}

interface AnimatedLoginFormProps {
  setViaSSO: (flag: boolean) => void;
}

const AnimatedLoginForm: FC<AnimatedLoginFormProps> = ({ setViaSSO }) => {
  const { setUser } = useAuth();
  const { getApi } = usePermissions();
  const navigate = useNavigate();
  const { t } = useTranslation('auth', { keyPrefix: 'login' });
  const navigateWithToken = useNavigateWithToken();
  const branding = useBrandingStore((state) => state.branding);
  const [showPassword, setShowPassword] = useState(false);

  const domain = getSubDomain(window.location.host);

  const login = getApi(ApiEnum.Login);
  const loginMutation = useMutation((formData: IForm) => login(formData), {
    onSuccess: (data: any) =>
      navigateWithToken(
        data.result.data.uat,
        data.result.data.redirectUrl,
        setUser,
        navigate,
      ),
  });

  const useGetSSOFromDomain = getApi(ApiEnum.GetOrganizationDomain);
  const { data } = useGetSSOFromDomain(domain, domain !== '' ? true : false);

  const useLoginViaSSO = getApi(ApiEnum.LoginSSO);
  const { refetch } = useLoginViaSSO(
    { domain },
    {
      enabled: false,
      onSuccess: (data: any) => {
        if (data && data.redirectUrl) {
          window.location = data.redirectUrl;
        }
      },
    },
  );

  const schema = yup.object({
    email: yup
      .string()
      .required(t('requiredField'))
      .validateEmail(t('validEmailError')),
    password: yup.string().required(t('requiredField')),
    domain: yup.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: { domain },
    mode: 'onChange',
  });

  const onSubmit = (formData: IForm) => {
    loginMutation.mutate({ ...formData, domain });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const showSSO =
    (data?.result?.data?.sso?.active &&
      data?.result?.data?.sso?.idp !== 'CUSTOM_LDAP') ||
    !domain;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-md px-8"
    >
      {/* Logo */}
      <motion.div
        variants={itemVariants}
        className="flex justify-center mb-10"
      >
        <motion.img
          src={branding?.logo?.original || OfficeLogoSvg}
          alt="Logo"
          className="h-12 object-contain"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Title */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back
        </h1>
        <p className="text-gray-500">
          Sign in to continue to your workspace
        </p>
      </motion.div>

      {/* Error Banner */}
      {loginMutation.isError && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100"
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-5 h-5 text-red-500">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-sm text-red-700">
              {readFirstAxiosError(loginMutation.error) || t('error')}
            </p>
          </div>
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Email Input */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Work Email
          </label>
          <div className="relative">
            <input
              {...register('email')}
              type="email"
              data-testid="signin-email"
              placeholder="Enter your email"
              className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-200 outline-none
                ${
                  errors.email
                    ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                    : 'border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100'
                }
                bg-gray-50/50 hover:bg-white focus:bg-white
              `}
            />
            <motion.div
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </motion.div>
          </div>
          {errors.email && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-500"
            >
              {errors.email.message}
            </motion.p>
          )}
        </motion.div>

        {/* Password Input */}
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              data-testid="signin-password"
              placeholder="Enter your password"
              className={`w-full px-4 py-3.5 pr-12 rounded-xl border-2 transition-all duration-200 outline-none
                ${
                  errors.password
                    ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                    : 'border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100'
                }
                bg-gray-50/50 hover:bg-white focus:bg-white
              `}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
          {errors.password && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-red-500"
            >
              {errors.password.message}
            </motion.p>
          )}
        </motion.div>

        {/* Forgot Password Link */}
        <motion.div variants={itemVariants} className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Forgot password?
          </Link>
        </motion.div>

        {/* Sign In Button */}
        <motion.div variants={itemVariants}>
          <motion.button
            type="submit"
            data-testid="signin-btn"
            disabled={!isValid || loginMutation.isLoading}
            whileHover={{ scale: isValid ? 1.02 : 1 }}
            whileTap={{ scale: isValid ? 0.98 : 1 }}
            className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-200
              ${
                isValid
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40'
                  : 'bg-gray-300 cursor-not-allowed'
              }
            `}
          >
            {loginMutation.isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
                <span>Signing in...</span>
              </div>
            ) : (
              'Sign In'
            )}
          </motion.button>
        </motion.div>

        {/* SSO Button */}
        {showSSO && (
          <motion.div variants={itemVariants}>
            <motion.button
              type="button"
              data-testid="signin-sso-cta"
              onClick={() => {
                if (domain) {
                  refetch();
                } else {
                  setViaSSO(true);
                }
              }}
              disabled={loginMutation.isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-xl font-semibold text-gray-700 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 shadow-sm"
            >
              Sign in with SSO
            </motion.button>
          </motion.div>
        )}
      </form>

      {/* Footer */}
      <motion.div
        variants={itemVariants}
        className="mt-8 text-center text-sm text-gray-500"
      >
        Powered by{' '}
        <span className="font-semibold text-gray-700">Auzmor Office</span>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedLoginForm;

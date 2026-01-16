import { FC, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import useAuth from 'hooks/useAuth';
import { getSubDomain } from 'utils/misc';
import { useBrandingStore } from 'stores/branding';
import { usePageTitle } from 'hooks/usePageTitle';
import { usePermissions } from 'hooks/usePermissions';
import { ApiEnum } from 'utils/permissions/enums/apiEnum';
import LoginBackground from './components/LoginBackground';
import AnimatedLoginForm from './components/AnimatedLoginForm';
import LoginViaSSO from './components/LoginViaSSO';

const LoginAnimated: FC = () => {
  usePageTitle('login');
  const [viaSSO, setViaSSO] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { getApi } = usePermissions();

  const domain = getSubDomain(window.location.host);
  const useGetSSOFromDomain = getApi(ApiEnum.GetOrganizationDomain);
  const { isFetching: isDomainInfoLoading } = useGetSSOFromDomain(
    domain,
    domain !== '' ? true : false,
  );
  const _branding = useBrandingStore((state) => state.branding);

  const checkLogin = getApi(ApiEnum.GetLoginApi);
  const checkLoginMutation = useMutation(checkLogin, {
    onSuccess: (data: any) => {
      if (data?.data?.code === 200) {
        return window.location.replace(data?.data?.result?.data?.redirectUrl);
      }
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
  });

  useEffect(() => {
    // Skip login check in development or on Vercel preview domains
    const isVercelDomain = window.location.host.includes('vercel.app');
    if (process.env.NODE_ENV === 'development' || isVercelDomain) {
      setLoading(false);
      return;
    }
    if (!user && !domain) {
      checkLoginMutation.mutate();
    } else {
      setLoading(false);
    }
  }, [domain, user]);

  if (user) {
    return <Navigate to="/feed" />;
  }

  if (loading || isDomainInfoLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-teal-700">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full"
          />
          <p className="text-white/70 text-sm">Loading...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex">
      {/* Left Panel - World Map Background */}
      <div className="hidden lg:block w-1/2 h-full bg-teal-700 relative overflow-hidden">
        <LoginBackground />
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center bg-white relative">
        {/* Form content */}
        <div className="relative z-10 w-full max-w-md">
          {viaSSO ? (
            <div className="px-8">
              <LoginViaSSO setViaSSO={setViaSSO} />
            </div>
          ) : (
            <AnimatedLoginForm setViaSSO={setViaSSO} />
          )}
        </div>

      </div>
    </div>
  );
};

export default LoginAnimated;

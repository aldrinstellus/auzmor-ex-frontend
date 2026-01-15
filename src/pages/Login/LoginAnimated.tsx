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
import FloatingAvatars from './components/FloatingAvatars';
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
    if (process.env.NODE_ENV === 'development') {
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
    // Loading state with animation
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
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
    <div className="h-screen w-screen flex overflow-hidden">
      {/* Left Panel - Original Background with Floating Avatars */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="hidden lg:block w-1/2 h-full relative"
      >
        <FloatingAvatars />
      </motion.div>

      {/* Right Panel - Login Form */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full lg:w-1/2 h-full flex items-center justify-center bg-white relative"
      >
        {/* Subtle pattern background */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />

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

        {/* Bottom gradient accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
      </motion.div>
    </div>
  );
};

export default LoginAnimated;

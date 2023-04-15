import AppShell from 'components/AppShell';
import Navbar from 'components/AppShell/components/Navbar';
import useAuth from 'hooks/useAuth';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface IRequireAuthProps {}

const RequireAuth: React.FC<IRequireAuthProps> = () => {
  // ⬇️ get authentication
  const { user } = useAuth();

  return !user ? (
    <AppShell>
      <Navbar />
      <div className="mx-14 mt-12">
        <Outlet />
      </div>
    </AppShell>
  ) : (
    <Navigate to="/login" />
  );
};

export default RequireAuth;

import AppShell from 'components/AppShell';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface IRequireAuthProps {}

const RequireAuth: React.FC<IRequireAuthProps> = () => {
  // ⬇️ get authentication token
  let isAuthenticated = true;
  return isAuthenticated ? (
    <AppShell>
      <Outlet />
    </AppShell>
  ) : (
    <Navigate to="/login" />
  );
};

export default RequireAuth;

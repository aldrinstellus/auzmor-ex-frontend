import PageLoader from 'components/PageLoader';
import useRole from 'hooks/useRole';
import React, { FC, Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { IS_PROD_OR_STAGING } from 'utils/constants';

interface IViewManagerProps {}

const ViewManager: FC<IViewManagerProps> = ({}) => {
  const { isAdmin } = useRole();

  if (isAdmin || IS_PROD_OR_STAGING) {
    return (
      <Suspense
        fallback={
          <div className="w-full h-screen">
            <PageLoader />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    );
  }

  return <Navigate to={`/user${location.pathname}`} />;
};

export default ViewManager;

import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Navigate,
  isRouteErrorResponse,
  useRouteError,
} from 'react-router-dom';

interface IErrorBoundaryProps {}

const ErrorBoundary: FC<IErrorBoundaryProps> = () => {
  const { t } = useTranslation('components', { keyPrefix: 'ErrorBoundary' });
  const error = useRouteError() as Error;

  if (isRouteErrorResponse(error)) {
    if (error.status === 403) {
      return (
        <div className="flex flex-col items-center">
          <h2>{t('forbidden.title')}</h2>
          <div>{t('forbidden.message')}</div>
        </div>
      );
    }
    if (error.status === 500) {
      return <Navigate to="/500" />;
    }
  }
  return <div>{t('generic.message')}</div>;
};

export default ErrorBoundary;

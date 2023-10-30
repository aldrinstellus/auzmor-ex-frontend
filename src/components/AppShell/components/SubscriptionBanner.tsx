import Button, { Size } from 'components/Button';
import Icon from 'components/Icon';
import useAuth from 'hooks/useAuth';
import React from 'react';

type AppProps = {
  closeBanner: () => any;
};

const SubscriptionBanner: React.FC<AppProps> = ({ closeBanner }) => {
  const { user } = useAuth();
  const daysRemaining = user?.subscription?.daysRemaining || 0;
  const subscriptionType = user?.subscription?.type || 'TRIAL';

  if (subscriptionType !== 'TRIAL') {
    return null;
  }

  return (
    <div className="h-9 bg-neutral-900 flex justify-center items-center text-sm text-white relative">
      {(() => {
        if (daysRemaining > 6) {
          return (
            <span>
              Experience &nbsp;
              <span className="text-primary-500">
                {user?.subscription?.daysRemaining} days trial
              </span>
              &nbsp; of Auzmor Office
            </span>
          );
        }
        if (daysRemaining > 0) {
          return (
            <span>
              <span className="text-primary-500">
                {user?.subscription?.daysRemaining} days left
              </span>
              &nbsp; for your free Auzmor Office trial
            </span>
          );
        }
        return (
          <span>
            Your subscription has expired. Please contact sales to continue
            using Auzmor Office
          </span>
        );
      })()}
      <div className="pl-6">
        <Button label="Contact Sales" size={Size.ExtraSmall} />
      </div>
      <div className="absolute right-8">
        <Icon
          name="close"
          size={18}
          className="text-white cursor-pointer"
          onClick={closeBanner}
        />
      </div>
    </div>
  );
};

export default SubscriptionBanner;

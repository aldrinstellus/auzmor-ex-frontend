import { FC, ReactElement } from 'react';
import OnboardWelcome from 'images/onboard-welcome.png';
import Button from 'components/Button';
import { useTranslation } from 'react-i18next';

type WelcomeScreenProps = {
  next: () => void;
  dataTestId?: string;
};

const WelcomeScreen: FC<WelcomeScreenProps> = ({
  next,
  dataTestId,
}): ReactElement => {
  const { t } = useTranslation('components', {
    keyPrefix: 'userOnboard.WelcomeScreen',
  });

  return (
    <div className="flex flex-col min-h-full justify-between min-w-full">
      <div className="flex items-center flex-col justify-between gap-y-10 px-10 mt-6">
        <img src={OnboardWelcome} alt={t('welcomeImageAlt')} />
        <p className="font-bold text-neutral-900 text-2xl">
          {t('welcomeTitle')}
        </p>
        <p className="font-normal text-sm text-neutral-500">
          {t('welcomeMessage')}
        </p>
      </div>
      <div className="bg-blue-50 rounded-b-9xl">
        <div className="p-3 flex items-center justify-between">
          <div />
          <Button
            className="font-bold"
            label={t('next')}
            onClick={next}
            dataTestId={dataTestId}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;

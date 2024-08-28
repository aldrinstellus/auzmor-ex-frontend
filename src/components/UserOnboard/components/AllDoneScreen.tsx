import { FC, ReactElement } from 'react';
import OnboardFinish from 'images/onboard-finish.png';
import Button from 'components/Button';
import { useTranslation } from 'react-i18next';

type AllDoneScreenProps = {
  closeModal: any;
};

const AllDoneScreen: FC<AllDoneScreenProps> = ({
  closeModal,
}): ReactElement => {
  const { t } = useTranslation('components', {
    keyPrefix: 'userOnboard.AllDoneScreen',
  });
  return (
    <div className="flex flex-col min-h-full justify-between min-w-full">
      <div className="flex items-center flex-col justify-between gap-y-4 px-10 mt-6">
        <img src={OnboardFinish} alt={t('onboardingSuccessfulAlt')} />
        <p className="font-bold text-neutral-900 text-2xl mt-8">
          {t('allDoneTitle')}
        </p>
        <p className="font-normal text-sm text-neutral-500">
          {t('allSetMessage')}
        </p>
      </div>
      <div className="bg-blue-50 rounded-b-9xl">
        <div className="p-3 flex items-center justify-between">
          <div />
          <Button
            className="font-bold"
            label={t('launchButtonLabel')}
            onClick={closeModal}
            dataTestId="launch-auzmor-office-btn"
          />
        </div>
      </div>
    </div>
  );
};

export default AllDoneScreen;

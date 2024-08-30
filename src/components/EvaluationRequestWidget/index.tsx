import clsx from 'clsx';
import Button from 'components/Button';
import { useShouldRender } from 'hooks/useShouldRender';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getLearnUrl } from 'utils/misc';
// import EmptyState from './Component/EmptyState';
// import EvaluationRequestCard from './Component/EvaluationRequestCard';
import { useGetEvaluation } from 'queries/learn';
import EvaluationRequestRow from './Component/EvaluationRequestRow';
import Card from 'components/Card';

const ID = 'EvaluationRequestWidget';

const EvaluationRequestWidget = (className = '') => {
  const { t } = useTranslation('learnWidget', { keyPrefix: 'progressTracker' });
  const shouldRender = useShouldRender(ID);

  if (!shouldRender) {
    return <></>;
  }

  const modules = ['Course', 'Event'];

  const { data } = useGetEvaluation({
    q: '',
    status: 'PENDING',
    modules: modules?.map((each) => each).join(','),
    limit: 3,
    page: 1,
  });
  const evaluationRequestData = data?.result?.data || [];
  console.log('evaluationRequestData :', evaluationRequestData);

  const style = useMemo(
    () => clsx({ 'min-w-[293px]': true, [className]: true }),
    [className],
  );

  return (
    <div className={style}>
      <div className="flex justify-between items-center ">
        <div className="text-base font-bold">Evaluation Request</div>
        <Button
          label={t('viewAll') || 'View All'}
          className="bg-transparent !text-primary-500 hover:!text-primary-600 hover:!bg-transparent focus:bg-transparent active:!bg-transparent active:!text-primary-700 outline outline-1 focus:outline-primary-500"
          onClick={() => window.location.assign(`${getLearnUrl()}/evaluations`)}
        />
      </div>
      <div className="mt-2">
        {/* <EmptyState /> */}
        <Card className="flex flex-col w-full py-2 items-center ">
          {evaluationRequestData.map((data: any) => {
            return <EvaluationRequestRow key={data?.id} data={data} />;
          })}
        </Card>
        {/* {!isLoading && trackerData.length === 0 ? <EmptyState /> : <>hi</>} */}
      </div>
    </div>
  );
};

export default EvaluationRequestWidget;

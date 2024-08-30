import clsx from 'clsx';
import Avatar from 'components/Avatar';
import Card from 'components/Card';
import Divider from 'components/Divider';
import Icon from 'components/Icon';
import Truncate from 'components/Truncate';
import React, { FC, useMemo } from 'react';
import { getLearnUrl } from 'utils/misc';

interface EvaluationRequestRowProps {
  className?: string;
  data?: Record<string, any>;
}
const EvaluationRequestRow: FC<EvaluationRequestRowProps> = ({
  className = '',
  data,
}) => {
  const style = useMemo(
    () => clsx({ 'mx-2  my-2 rounded-9xl': true, [className]: true }),
    [className],
  );
  return (
    <Card className={style}>
      <div className="m-2">
        <div className="flex justify-between items-center mb-2 text-sm font-bold">
          <Truncate text={data?.module} />
          <Icon
            onClick={() => {
              window.location.assign(
                `${getLearnUrl()}/evaluations/3729?status=PENDING`,
              );
            }}
            className="text-secondary-400"
            name="documentView"
          />
        </div>
        <Divider className="my-1" />
        <div className="flex   items-center mt-2">
          <Avatar
            name={data?.user?.full_name}
            image={''}
            size={32}
            className="border-2 border-white"
            onClick={() => {}}
          />

          <Truncate
            className="font-bold text-neutral-900"
            text={data?.user?.full_name}
          />
          <div className="text-neutral-500 ml-auto text-sx font-normal">
            Attempts:{data?.attempt}
          </div>
        </div>
        <div className="flex flex-row items-center text-neutral-500 text-sx font-normal ml-2">
          <Icon name="calendar" size={16} className="mr-1" />
          <div>Attempted on: Jul 18, 2024</div>
        </div>
      </div>
    </Card>
  );
};

export default EvaluationRequestRow;

import { clsx } from 'clsx';
import Icon from 'components/Icon';
import ProgressBar from 'components/ProgressBar';
import Spinner from 'components/Spinner';
import React, { FC, useEffect, useState } from 'react';

interface IindexProps {}

const index: FC<IindexProps> = ({}) => {
  const [right, setRight] = useState<number>(2);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    try {
      const refElem = document.getElementsByClassName('app-container')[0];
      setRight(
        (window.innerWidth - refElem.getBoundingClientRect().width) / 2 + 2,
      );
    } catch (_e) {
      setRight(2);
    }
  }, []);

  const style = clsx({
    'fixed flex flex-col bottom-0 z-[999] w-[420px] transition-all h-[72px] duration-300 rounded-t-9xl border border-neutral-300 bg-white':
      true,
    '!h-[240px]': isExpanded,
  });

  const contentStyle = clsx({
    'flex flex-col gap-4 w-full h-[168px] overflow-y-auto px-4 py-3': true,
  });

  return (
    <div
      className={style}
      style={{
        right,
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      }}
    >
      <div className="flex flex-col bg-neutral-100 rounded-t-9xl px-4 py-3 border-b border-b-neutral-200">
        <div className="flex items-center gap-2 ml-12">
          <span className="flex-grow font-medium leading-6 text-neutral-900">
            Syncing 10 out of 20 files
          </span>
          <Icon
            name="arrowDown"
            size={24}
            onClick={() => setIsExpanded(!isExpanded)}
            className={clsx({ 'rotate-0': isExpanded, '-rotate-180': true })}
          />
          <Icon name="close" size={20} />
        </div>
        <div className="flex items-center gap-4">
          <span>75%</span>
          <ProgressBar
            completed={75}
            total={100}
            className="flex-grow"
            barClassName="!w-full"
            barFilledClassName="!bg-primary-500"
            customLabel={<></>}
          />
        </div>
      </div>
      <div className={contentStyle}>
        <div className="flex gap-2">
          <Icon name="doc" />
          <span className="flex-grow">Invoice- November</span>
          <Icon
            name="tickCircleFilled"
            color="text-primary-600"
            hover={false}
            size={20}
          />
        </div>
        <div className="flex gap-2">
          <Icon name="xls" />
          <span className="flex-grow">Invoice details</span>
          <Spinner className="!w-5 !h-5" />
        </div>
        <div className="flex gap-2">
          <Icon name="xls" />
          <span className="flex items-center gap-1 flex-grow">
            Invoice details{' '}
            <span className="text-xxs text-neutral-500 leading-[15px] font-medium">
              (Unsupported file type)
            </span>
          </span>
          <Icon name="infoCircleFilled" size={20} hover={false} />
        </div>
        <div className="flex gap-2">
          <Icon name="xls" />
          <span className="flex items-center gap-1 flex-grow">
            Travel policy
          </span>
          <Icon
            name="closeCircleFilled"
            color="text-red-500"
            hoverColor="text-red-600"
            className="hover:!text-red-600"
            size={20}
          />
        </div>
      </div>
    </div>
  );
};

export default index;

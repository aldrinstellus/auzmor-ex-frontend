import Card from 'components/Card';
import Divider from 'components/Divider';
import React, { useMemo } from 'react';
import Time from 'images/time.svg';
import useHover from 'hooks/useHover';
import clsx from 'clsx';

export interface IProfessionalDetailsProps {
  dateOfJoin: string;
  timezone: string;
}

const ProfessionalDetails: React.FC<IProfessionalDetailsProps> = ({
  dateOfJoin,
  timezone,
}) => {
  const [isHovered, eventHandlers] = useHover();

  const onHoverStyles = useMemo(
    () => clsx({ 'mb-8': true }, { 'shadow-xl': isHovered }),
    [isHovered],
  );

  const joiningDate = new Date(dateOfJoin);
  return (
    <div {...eventHandlers}>
      <Card className={onHoverStyles}>
        <div className="text-neutral-900 font-bold text-base px-6 pt-6 pb-4">
          Professional Details
        </div>
        <Divider />
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <div className="text-neutral-500 text-sm font-bold">
              Date of Joining
            </div>
            <div className="flex space-x-3">
              <img src={Time} alt="" />
              <div className="text-neutral-900 text-base font-medium ">
                Joined on {joiningDate.toDateString()}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-neutral-500 text-sm font-bold">Timezone</div>
            <div className="flex space-x-3">
              <img src={Time} alt="" />
              <div className="text-neutral-900 text-base font-medium ">
                Joined on {timezone?.toString()}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfessionalDetails;

import Card from 'components/Card';
import Divider from 'components/Divider';
import React, { useMemo } from 'react';
import Cake from 'images/cake.svg';
import Female from 'images/female.svg';
import Location from 'images/Location.svg';
import Married from 'images/married.svg';
import clsx from 'clsx';
import useHover from 'hooks/useHover';

export interface IPersonalDetailsProps {
  dateOfBirth: string;
  gender: string;
  address: string;
  maritalStatus: string;
  skills: string[];
}

const PersonalDetails: React.FC<IPersonalDetailsProps> = ({
  dateOfBirth,
  gender,
  address,
  maritalStatus,
  skills,
}) => {
  const [isHovered, eventHandlers] = useHover();

  const onHoverStyles = useMemo(
    () => clsx({ 'mb-8': true }, { 'shadow-xl': isHovered }),
    [isHovered],
  );

  return (
    <div {...eventHandlers}>
      <Card className={onHoverStyles}>
        <div className="text-neutral-900 font-bold text-base px-6 pt-6 pb-4">
          Personal Details
        </div>
        <Divider />
        <div className="p-6">
          <div className="pb-4 space-y-3">
            <div className="flex space-x-3">
              <img src={Cake} alt="" />
              <div className="text-neutral-900 text-base font-medium">
                Born on {dateOfBirth}
              </div>
            </div>
            <div className="flex space-x-3">
              <img src={Female} alt="" />
              <div className="text-neutral-900 text-base font-medium">
                {gender}
              </div>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="text-neutral-500 text-sm font-bold">
              Permanent Address
            </div>
            <div className="flex space-x-3">
              <img src={Location} alt="" />
              <div className="text-neutral-900 text-base font-medium">
                {address}
              </div>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="text-neutral-500 text-sm font-bold">
              Marital Status
            </div>
            <div className="flex space-x-3">
              <img src={Married} alt="" />
              <div className="text-neutral-900 text-base font-medium">
                {maritalStatus}
              </div>
            </div>
          </div>
          <div>
            <div className="text-neutral-500 text-sm font-bold">Skills</div>
            <div className="text-neutral-900 text-base font-medium">
              {skills.map((skill, index) => (
                <ul key={index}>
                  <li>{skill}</li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PersonalDetails;

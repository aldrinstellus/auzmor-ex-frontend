import clsx from 'clsx';
import Card from 'components/Card';
import Divider from 'components/Divider';
import Icon from 'components/Icon';
import useHover from 'hooks/useHover';
import React, { useMemo } from 'react';

export interface IAboutMeProps {
  aboutMe: any;
  canEdit?: boolean;
}

const AboutMe: React.FC<IAboutMeProps> = ({ aboutMe, canEdit }) => {
  const [isHovered, eventHandlers] = useHover();

  const onHoverStyles = useMemo(
    () => clsx({ 'mb-8 px-6': true }, { 'shadow-xl': isHovered }),
    [isHovered],
  );

  return (
    <div {...eventHandlers}>
      <Card className={onHoverStyles}>
        <div className="flex justify-between items-center">
          <div className="text-neutral-900 font-bold text-base pt-6 pb-4">
            About me
          </div>
          {canEdit && isHovered && (
            <div>
              <Icon name="edit" />
            </div>
          )}
        </div>
        <Divider />
        <div className="text-neutral-900 text-sm font-normal pt-4 pb-6">
          {aboutMe?.fullName}
        </div>
      </Card>
    </div>
  );
};

export default AboutMe;

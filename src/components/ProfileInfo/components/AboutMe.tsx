import clsx from 'clsx';
import Card from 'components/Card';
import Divider from 'components/Divider';
import useHover from 'hooks/useHover';
import React, { useMemo } from 'react';

export interface IAboutMeProps {
  aboutMe: string;
}

const AboutMe: React.FC<IAboutMeProps> = ({ aboutMe }) => {
  const [isHovered, eventHandlers] = useHover();

  const onHoverStyles = useMemo(
    () => clsx({ 'mb-8': true }, { 'shadow-xl': isHovered }),
    [isHovered],
  );

  return (
    <div {...eventHandlers}>
      <Card className={onHoverStyles}>
        <div className="text-neutral-900 font-bold text-base px-6 pt-6 pb-4">
          About me
        </div>
        <Divider />
        <div className="text-neutral-900 text-sm font-normal px-6 pt-4 pb-6">
          {aboutMe}
        </div>
      </Card>
    </div>
  );
};

export default AboutMe;

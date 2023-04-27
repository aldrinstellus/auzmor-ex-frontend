import React from 'react';
import useHover from 'hooks/useHover';
import { default as InfoCircleFilled } from './InfoCircleFilled';
import { default as InfoCircleOutline } from './InfoCircleOutline';

type IconProps = {
  size?: number;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
};

const InfoCircleIcon: React.FC<IconProps> = ({
  hover = true,
  onClick,
  className = '',
  ...props
}) => {
  const [isHovered, eventHandlers] = useHover();

  return (
    <div onClick={onClick} className={className} {...eventHandlers}>
      {hover && isHovered ? (
        <InfoCircleFilled {...props} />
      ) : (
        <InfoCircleOutline {...props} />
      )}
    </div>
  );
};

export default InfoCircleIcon;

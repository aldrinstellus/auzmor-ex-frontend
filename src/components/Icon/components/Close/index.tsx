import React from 'react';
import useHover from 'hooks/useHover';
import { default as CloseFilled } from './CloseFilled';

type IconProps = {
  size?: number;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
};

const CloseIcon: React.FC<IconProps> = ({
  hover,
  onClick,
  className = 'hover:cursor-pointer',
  ...props
}) => {
  const [isHovered, eventHandlers] = useHover();

  return (
    <div onClick={onClick} className={className} {...eventHandlers}>
      <CloseFilled {...props} />
    </div>
  );
};

export default CloseIcon;

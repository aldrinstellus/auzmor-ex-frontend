import React from 'react';
import useHover from 'hooks/useHover';
import { default as HashtagFilled } from './HashtagFilled';

type IconProps = {
  size?: number;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
};

const OrangeHashtag: React.FC<IconProps> = ({
  hover,
  onClick,
  className = '',
  ...props
}) => {
  const [isHovered, eventHandlers] = useHover();

  return (
    <div onClick={onClick} className={className} {...eventHandlers}>
      <HashtagFilled {...props} />
    </div>
  );
};

export default OrangeHashtag;

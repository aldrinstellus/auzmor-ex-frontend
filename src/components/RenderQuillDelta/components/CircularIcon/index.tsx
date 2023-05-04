import Icon from 'components/Icon';
import React, { ReactElement, ReactNode } from 'react';

type CircularIconProps = {
  name: string;
  className?: string;
  size?: number;
};

export const CircularIcon: React.FC<CircularIconProps> = (
  props: CircularIconProps,
): ReactElement => {
  return (
    <div className="border border-gray-300 rounded-full">
      <Icon className={props?.className} name={props.name} size={props?.size} />
    </div>
  );
};

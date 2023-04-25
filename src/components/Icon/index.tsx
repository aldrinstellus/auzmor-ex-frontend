import clsx from 'clsx';
import React, { ReactNode } from 'react';
import PeopleIcon from './components/People';

export type IconProps = {
  name: string;
  size?: number;
  onClick?: (...param: any) => void | null;
  className?: string;
  hover?: boolean;
};

const iconMap: Record<string, any> = {
  people: PeopleIcon,
};

const Icon: React.FC<IconProps> = ({
  name,
  size = 22,
  onClick = null,
  className = '',
  hover = true,
}) => {
  const Component = iconMap[name] || null;

  const styles = clsx({ 'cursor-pointer': !!onClick, [className]: true });

  return (
    <Component
      name={name}
      size={size}
      className={styles}
      hover={hover}
      onClick={onClick}
    />
  );
};

export default Icon;

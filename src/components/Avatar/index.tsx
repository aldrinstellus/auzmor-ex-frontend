import React, { MouseEventHandler, useMemo } from 'react';
import clsx from 'clsx';
import isDarkColor from 'is-dark-color';
import { getInitials } from 'utils/misc';
import Icon from 'components/Icon';

export type AvatarProps = {
  name?: string;
  onClick?: MouseEventHandler<Element>;
  className?: string;
  image?: string;
  round?: boolean;
  showActiveIndicator?: boolean;
  showEditIcon?: boolean;
  active?: boolean;
  size?: number;
  bgColor?: string;
};

const Avatar: React.FC<AvatarProps> = ({
  name = 'U',
  className = '',
  round = true,
  active = true,
  onClick = () => {},
  image = '',
  size = 48,
  showActiveIndicator = false,
  bgColor = '#343434',
  showEditIcon = false,
}) => {
  const containerStyles = useMemo(
    () =>
      clsx(
        { 'relative flex justify-center items-center': true },
        {
          'rounded-full': round,
        },
        {
          'rounded-lg': !round,
        },
        {
          [className]: true,
        },
      ),
    [round],
  );

  const imgStyles = useMemo(
    () =>
      clsx(
        { 'object-cover': true },
        {
          'rounded-full': round,
        },
        {
          'rounded-lg': !round,
        },
      ),
    [round],
  );

  const indicatorStyles = clsx(
    { 'absolute bg-green-400 border-2 border-white rounded-full': true },
    { 'top-0 right-0': round },
    { '-top-1 -right-1': !round },
  );

  const editIconStyles = clsx(
    {
      'absolute bg-primary-500 border-1 border-white rounded-full p-2 cursor-pointer':
        true,
    },
    { 'top-0 right-0': round },
  );

  const divStyle = useMemo(
    () => ({
      height: `${size}px`,
      width: `${size}px`,
      backgroundColor: bgColor,
    }),
    [size],
  );

  const activeIndicator = useMemo(() => {
    return (
      active && (
        <div
          style={{ height: `${size / 5}px`, width: `${size / 5}px` }}
          className={indicatorStyles}
        />
      )
    );
  }, []);

  const editIcon = useMemo(() => {
    return (
      <Icon
        name="edit"
        className={editIconStyles}
        stroke="#ffffff"
        hover={false}
      />
    );
  }, []);

  const isBgDark = isDarkColor(bgColor);

  const textStyles = clsx(
    { 'text-white': isBgDark },
    { 'text-neutral-800': !isBgDark },
    { 'font-bold': true },
  );

  return (
    <div className={containerStyles} style={divStyle} onClick={onClick}>
      {!!image ? (
        <img className={imgStyles} style={divStyle} src={image} alt={name} />
      ) : (
        <span className={textStyles} style={{ fontSize: `${size * 0.45}px` }}>
          {name && getInitials(name)}
        </span>
      )}
      {showActiveIndicator && activeIndicator}
      {showEditIcon && editIcon}
    </div>
  );
};

export default Avatar;

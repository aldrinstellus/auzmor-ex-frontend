import clsx from 'clsx';
import Icon from 'components/Icon';
import IconWrapper, { Type } from 'components/Icon/components/IconWrapper';
import useHover from 'hooks/useHover';
import React, { useState } from 'react';

interface IIcon {
  name: string;
  color: string;
  bgColor: string;
}

type AppProps = {
  icon: IIcon;
  label: string | React.ReactNode;
  value: string | React.ReactNode;
  canEdit?: boolean;
  editNode?: React.ReactNode;
  dataTestId?: string;
  bgColor?: string;
  border?: boolean;
};

const InfoRow: React.FC<AppProps> = ({
  icon,
  label,
  value,
  canEdit,
  editNode,
  dataTestId,
  border = true,
}) => {
  const [isHovered, eventHandlers] = useHover();
  const [editMode, setEditMode] = useState();

  if (editMode) {
    return <div>Edit</div>;
  }

  return (
    <div
      {...eventHandlers}
      data-testid={dataTestId}
      className={clsx({ 'relative py-6': true }, { 'border-b': border })}
    >
      <div className="flex items-center">
        <div className="flex items-center w-[200px]">
          <IconWrapper
            type={Type.Square}
            className={icon.bgColor}
            border={false}
          >
            <Icon name={icon.name} color={icon.color} size={16} />
          </IconWrapper>
          <div className="text-neutral-500 font-bold text-sm ml-2.5">
            {label}
          </div>
        </div>
        <div className="text-neutral-900 font-medium">{value}</div>
      </div>
      {isHovered && (
        <div className="absolute right-0 top-7">
          <Icon name="edit" size={16} />
        </div>
      )}
    </div>
  );
};

export default InfoRow;

import React, { useRef } from 'react';
import { IMenuItem } from '.';
import Icon from 'components/Icon';
import { twConfig } from 'utils/misc';
import useHover from 'hooks/useHover';

type PopupMenuItemProps = {
  menuItem: IMenuItem;
  menuButtonRef: React.RefObject<HTMLButtonElement>;
  lastItem: boolean;
};

const PopupMenuItem: React.FC<PopupMenuItemProps> = ({
  menuItem,
  menuButtonRef,
  lastItem,
}) => {
  const [hovered, eventHandlers] = useHover();
  const itemRef = useRef<HTMLButtonElement>(null);
  return (
    <div
      className={`flex px-6 py-3 items-center hover:bg-primary-50 cursor-pointer space-x-3 ${
        menuItem.disabled && '!cursor-default'
      }`}
      ref={itemRef}
      style={menuItem.addDivider && !lastItem ? menuItem.dividerStyle : {}}
      onClick={() => {
        menuButtonRef.current?.click();
        menuItem?.onClick && menuItem.onClick();
      }}
      {...eventHandlers}
      data-testid={menuItem.dataTestId}
    >
      {menuItem.icon && (
        <Icon
          name={menuItem.icon}
          size={16}
          className={menuItem.iconClassName}
          fill={menuItem.fill || twConfig.theme.colors.primary['500']}
          stroke={
            (menuItem.disabled && twConfig.theme.colors.neutral['200']) ||
            menuItem.stroke
          }
          hover={hovered}
          disabled={menuItem.disabled}
        />
      )}
      <div
        className={`text-sm text-neutral-900 font-medium whitespace-nowrap ${
          menuItem.disabled && '!text-neutral-400'
        }`}
      >
        {menuItem.label}
      </div>
    </div>
  );
};

export default PopupMenuItem;

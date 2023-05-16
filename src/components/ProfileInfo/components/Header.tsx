import React from 'react';
import Button, {
  Variant as ButtonVariant,
  Size as ButtonSize,
} from 'components/Button';
import Icon from 'components/Icon';
import IconWrapper, { Type } from 'components/Icon/components/IconWrapper';

export type HeaderProps = {
  title: string;
  isHovered: boolean;
  isEditable: boolean;
  setIsEditable: (hide: boolean) => void;
  canEdit?: boolean;
};

const Header: React.FC<HeaderProps> = ({
  title,
  isHovered,
  isEditable,
  setIsEditable,
  canEdit,
}) => {
  return (
    <div className="flex justify-between items-center px-6">
      <div className="text-neutral-900 font-bold text-base pt-6 pb-4">
        {title}
      </div>
      {canEdit && isHovered && !isEditable ? (
        <IconWrapper type={Type.Square} className="cursor-pointer">
          <Icon
            name="edit"
            size={16}
            onClick={() => setIsEditable(!isEditable)}
          />
        </IconWrapper>
      ) : (
        isHovered &&
        isEditable && (
          <div className="flex space-x-3">
            <Button
              variant={ButtonVariant.Secondary}
              label={'Cancel'}
              size={ButtonSize.Small}
              onClick={() => setIsEditable(false)}
            />
            <Button
              label={'Save'}
              size={ButtonSize.Small}
              onClick={() => {
                // need to make an api call here
                // how idk
              }}
            />
          </div>
        )
      )}
    </div>
  );
};

export default Header;

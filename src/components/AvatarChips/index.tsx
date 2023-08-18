import AvatarChip, { IAvatarUser } from 'components/AvatarChip';
import React from 'react';

interface IAvatarChipsProps {
  users: IAvatarUser[];
  showCount: number;
  className?: string;
  avatarClassName?: string;
}

const AvatarChips: React.FC<IAvatarChipsProps> = ({
  users,
  showCount,
  className,
  avatarClassName,
}) => {
  return (
    <div className={`flex items-center flex-wrap gap-2 ${className}`}>
      {users.length > 0 &&
        users
          .slice(0, showCount)
          .map((user: IAvatarUser) => (
            <AvatarChip
              user={user}
              key={user.userId}
              className={avatarClassName}
            />
          ))}

      {users.length > showCount && (
        <div
          className={`flex items-center w-fit gap-1 rounded-[24px] border-1 border-neutral-200 bg-neutral-100
      px-2 py-3 text-primary-500 text-semibold text-sm 
      hover:border-primary-500 transition cursor-pointer ${avatarClassName}`}
        >
          +{users.length - showCount} more
        </div>
      )}
    </div>
  );
};

export default AvatarChips;

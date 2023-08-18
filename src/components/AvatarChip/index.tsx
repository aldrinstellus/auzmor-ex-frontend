import React from 'react';
import Avatar from 'components/Avatar';
import { getFullName, getProfileImage } from 'utils/misc';
import useAuth from 'hooks/useAuth';

export interface IAvatarUser {
  fullName: string;
  profileImage: object;
  status: string;
  workLocation?: string;
  designation?: string;
  userId: string;
}

interface IAvatarChipProps {
  user: IAvatarUser;
  className?: string;
}

const AvatarChip: React.FC<IAvatarChipProps> = ({ className, user }) => {
  return (
    <div
      className={`flex items-center w-fit gap-1 rounded-[24px] border-1 border-neutral-200 bg-neutral-100
      px-2 py-3 text-primary-500 text-semibold text-sm hover:border-primary-500 transition cursor-pointer ${className}`}
    >
      <Avatar
        name={getFullName(user)}
        image={getProfileImage(user)}
        size={16}
      />
      <span>{getFullName(user)}</span>
    </div>
  );
};

export default AvatarChip;

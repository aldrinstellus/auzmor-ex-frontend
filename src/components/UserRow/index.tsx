import React from 'react';
import { IGetUser } from 'queries/users';
import Avatar from 'components/Avatar';
import { getAvatarColor, getFullName, getProfileImage } from 'utils/misc';

interface IUserRowProps {
  user: IGetUser;
}

const UserRow: React.FC<IUserRowProps> = ({ user }) => {
  return (
    <div
      className="flex justify-between py-5 border-b-1 border-neutral-100 cursor-pointer px-6 hover:bg-primary-50"
      onClick={() => {}}
    >
      <div className="flex w-1/2 items-center">
        <div className="mr-4">
          <Avatar
            size={32}
            image={getProfileImage(user)}
            name={getFullName(user)}
            bgColor={getAvatarColor(user)}
          />
        </div>
        <div className="flex flex-col truncate w-full">
          <div className="text-neutral-900 font-bold text-sm truncate">
            {user ? getFullName(user) : ''}
          </div>
          <div className="text-neutral-500 text-xs truncate">
            {user.workEmail || ''}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-1/2">
        <div className="flex flex-row w-full justify-end">
          <div className={`text-neutral-500 text-xs truncate mr-6`}>
            {user.designation || 'Field not specified'}
          </div>
          <div className={`mr-6 flex items-center`}>
            <div className="w-1 h-1 bg-neutral-500 rounded-full"></div>
          </div>
          <div className={`text-neutral-500 text-xs truncate`}>
            {user?.workLocation?.name || 'Field not specified'}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default UserRow;

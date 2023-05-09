import Card from 'components/Card';
import React from 'react';
import Avatar from 'components/Avatar';
import Divider, { Variant as DividerVariant } from 'components/Divider';
import Button, { Variant as ButtonVariant } from 'components/Button';
import Icon from 'components/Icon';

export interface IProfileCoverProps {
  fullName?: string;
  status?: string;
  designation?: string;
  department?: string;
  location?: string;
}

const ProfileCover: React.FC<IProfileCoverProps> = ({
  fullName,
  status,
  designation,
  department,
  location,
}) => {
  return (
    <Card className="bg-white rounded-9xl pb-1">
      <div className="bg-[url(images/CoverImage.png)] bg-no-repeat bg-cover rounded-9xl w-[1328px] h-[180px]" />
      <div className="ml-8 mb-8 flex items-center space-x-4">
        <div className="-mt-28">
          <Avatar
            name={fullName || 'U'}
            image={''}
            size={96}
            className="border-2 border-white mt-8"
          />
        </div>
        <div className="flex flex-col space-y-5 mt-2">
          <div className="flex justify-between w-[1150px] ">
            <div className="flex space-x-4">
              <div className=" text-2xl font-bold">{fullName}</div>
              <div className="bg-red-100 border-1 border-red-200 rounded-full px-3 flex justify-center items-center">
                {status}
              </div>
            </div>
            <div className="text-sm font-bold">
              <Button
                className="flex"
                label="Follow"
                leftIcon="addCircle"
                variant={ButtonVariant.Secondary}
              />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="text-xs font-normal flex justify-center items-center">
              {designation}
            </div>

            <div className="bg-white">
              <Divider variant={DividerVariant.Vertical} />
            </div>

            <div className="flex justify-center items-center space-x-4">
              <div className="">
                <Icon name="briefcase" size={24} />
              </div>
              <div className="text-xs font-normal">{department}</div>
            </div>

            <div className="bg-white">
              <Divider variant={DividerVariant.Vertical} />
            </div>

            <div className="flex justify-center items-center space-x-4">
              <div className="">
                <Icon name="briefcase" size={24} />
              </div>
              <div className="text-xs font-normal">{location}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCover;

import Card from 'components/Card';
import React, { useContext, useRef } from 'react';
import Avatar from 'components/Avatar';
import Divider, { Variant as DividerVariant } from 'components/Divider';
import Button, {
  Size as ButtonSize,
  Variant as ButtonVariant,
} from 'components/Button';
import Icon from 'components/Icon';
import OutOfOffice from 'images/out-of-office.svg';
import Location from 'images/Location.svg';
import Briefcase from 'images/Briefcase.svg';
import IconButton, {
  Size,
  Variant as IconVariant,
} from 'components/IconButton';
import EditProfileModal from './components/EditProfileModal';
import { CreatePostContext } from 'contexts/CreatePostContext';

export interface IProfileCoverProps {
  profileCoverData: Record<string, any>;
  showModal: boolean;
  setShowModal: (flag: boolean) => void;
}

const ProfileCoverSection: React.FC<IProfileCoverProps> = ({
  profileCoverData,
  showModal,
  setShowModal,
}) => {
  const coverImageRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <Card className="bg-white pb-1 w-full h-[290.56px]">
        {/* Image Cover */}
        <div className="relative cursor-pointer">
          <img
            className="object-cover w-full h-[179.56px] rounded-9xl"
            src="https://libg.s3.us-east-2.amazonaws.com/download/Blue-And-Red-Over-The-Mountains.jpg"
          />
          {/* only show when you are in my profile */}
          <IconButton
            icon="edit"
            className="bg-white m-4 absolute top-0 right-0 p-3 text-black"
            variant={IconVariant.Secondary}
            size={Size.Medium}
            onClick={() => {
              setShowModal(true);
            }}
          />
        </div>
        {/* Profile Picture */}
        <div className="ml-8 mb-8 flex items-center">
          <div className="-mt-28">
            <Avatar
              name={profileCoverData?.fullName || 'U'}
              image={
                profileCoverData?.profileImage?.original ||
                'https://play-lh.googleusercontent.com/7Ac5TgaL15Ra4bvFVHJKCdJp4qvnL4djZj5bKc6RN-MZjzrvkeHbJytek0NPTSdZcp8'
              }
              size={96}
              className="border-2 border-white mt-8"
            />
          </div>

          <div className="ml-4 mr-6 mt-2 flex justify-between w-full">
            <div className="flex space-x-4">
              <div className="text-2xl font-bold">
                {profileCoverData?.userName || 'Megan Berry'}
              </div>
              <div className="bg-red-100 border-1 border-red-200 rounded-full px-3 flex justify-center items-center space-x-2">
                <img src={OutOfOffice} alt="" width={24} height={24} />
                <div>{profileCoverData?.status}</div>
              </div>
            </div>
            <Button
              className="flex"
              label="Edit Profile"
              leftIcon="edit"
              size={ButtonSize.Small}
              variant={ButtonVariant.Secondary}
              onClick={() => {
                setShowModal(true);
              }}
            />
          </div>
        </div>
        {/* rest.... */}
        <div className="flex space-x-4">
          <div className="text-xs font-normal flex justify-center items-center">
            {profileCoverData?.designation}
          </div>

          <div className="bg-white">
            <Divider variant={DividerVariant.Vertical} />
          </div>

          <div className="flex justify-center items-center space-x-4">
            {/* <div className="">
                <Icon name="briefcase" size={24} />
              </div> */}
            <img src={Briefcase} alt="" />

            <div className="text-xs font-normal">
              {profileCoverData?.department}
            </div>
          </div>

          <div className="bg-white">
            <Divider variant={DividerVariant.Vertical} />
          </div>

          <div className="flex justify-center items-center space-x-4">
            {/* <div className="">
                <Icon name="briefcase" size={24} />
              </div> */}
            <img src={Location} alt="" />
            <div className="text-xs font-normal">
              {profileCoverData?.location}
            </div>
          </div>
        </div>
        <EditProfileModal
          data={profileCoverData}
          showModal={showModal}
          setShowModal={setShowModal}
          coverImageRef={coverImageRef}
        />
      </Card>
      <input
        type="file"
        className="hidden"
        ref={coverImageRef}
        accept="image/*"
        onChange={(e) => {
          console.log('wwwww', e.target.files);
        }}
      />
    </>
  );
};

export default ProfileCoverSection;

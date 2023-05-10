import React, { ReactElement } from 'react';
import Button from 'components/Button';
import UpdateProfileImage from 'components/UpdateProfileImage';

type EditProfileScreenProps = {
  next: any;
};

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({
  next,
}): ReactElement => {
  return (
    <div className="flex flex-col min-h-full justify-between min-w-full">
      <div className="flex items-center flex-col justify-between gap-y-4 mt-6">
        <UpdateProfileImage />
        <p className="font-bold text-neutral-900 text-2xl">
          Set your profile photo
        </p>
        <p className="font-normal text-sm text-neutral-500">
          Click on the image above to upload your profile photo.
        </p>
        <div className="bg-green-50 px-5 py-3 border rounded-md border-transparent">
          <p className="font-normal text-sm text-neutral-900 whitespace-nowrap">
            Adding a profile photo will make it easier for your colleagues to
            recognise you.
          </p>
        </div>
      </div>
      <div className="bg-blue-50 mt-10">
        <div className="p-4 flex items-center justify-between">
          <div
            className="font-bold text-neutral-900 cursor-pointer"
            onClick={next}
          >
            Skip this step
          </div>
          <Button
            className="font-bold"
            label="Next"
            // loading={nextButtonLoading}
            onClick={next}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfileScreen;

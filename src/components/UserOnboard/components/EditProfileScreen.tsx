import React, { ReactElement } from 'react';

const EditProfileScreen: React.FC = (): ReactElement => {
  return (
    <div className="flex items-center flex-col justify-between gap-y-4 px-10">
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
  );
};

export default EditProfileScreen;

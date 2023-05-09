import Avatar from 'components/Avatar';
import Icon from 'components/Icon';
import React, { ReactElement, useEffect, useRef, useState } from 'react';

type EditProfileScreenProps = {
  fullName: string;
};

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({
  fullName,
}): ReactElement => {
  const [disableEdit, setDisableEdit] = useState<boolean>(true);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (disableEdit) nameRef?.current?.setAttribute('disabled', 'true');
    if (!disableEdit) {
      nameRef?.current?.removeAttribute('disabled');
      nameRef?.current?.focus();
    }
  }, [disableEdit]);

  return (
    <div className="flex items-center flex-col justify-between gap-y-4 px-10">
      <div className="flex items-center justify-center">
        <input
          className="outline-none bg-white text-neutral-900 font-bold text-2xl text-center w-min"
          defaultValue={fullName}
          ref={nameRef}
        ></input>

        <div
          className="border border-gray-300 rounded-xl cursor-pointer"
          onClick={() => setDisableEdit(!disableEdit)}
        >
          <Icon
            className="p-1"
            hover={false}
            stroke="#000000"
            name="edit"
            size={20}
          />
        </div>
      </div>
      <Avatar size={144} showEditIcon name={fullName} bgColor="#DBEAFE" />
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

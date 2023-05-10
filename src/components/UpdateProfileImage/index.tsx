import Avatar from 'components/Avatar';
import React, { ReactElement, useEffect, useState } from 'react';
import EditIcon from './components/EditIcon';
import useAuth from 'hooks/useAuth';
import { useUpload } from 'queries/files';
import { EntityType } from 'queries/files';
import { useMutation } from '@tanstack/react-query';
import { IUserUpdate, updateUserOnboard } from 'queries/users';

const UpdateProfileImage: React.FC = (): ReactElement => {
  const [profilePicture, setProfilePicture] = useState<File[]>();
  const { user, set } = useAuth();

  const { uploadMedia, uploadStatus } = useUpload();

  const updateProfileImageMutation = useMutation({
    mutationKey: ['update-profile-image-mutation'],
    mutationFn: updateUserOnboard,
    onError: (error: any) => {
      console.log('API call resulted in error: ', error);
    },
    onSuccess: (response) => {
      console.log('API call success', response);
      set(response);
    },
  });

  const { isLoading, isError } = updateProfileImageMutation;

  let files: any[] = [];

  const uploadAndSetProfilePicture = async () => {
    if (profilePicture) {
      files = await uploadMedia(profilePicture, EntityType.UserProfileImage);
      console.log({ files });
      updateProfileImageMutation.mutate({
        id: user?.id || '',
        profileImage: {
          fileId: files[0].id,
          originalUrl: files[0].originalUrl,
        },
      });
    }
  };

  useEffect(() => {
    uploadAndSetProfilePicture();
  }, [profilePicture]);

  return (
    <Avatar
      size={144}
      indicatorIcon={<EditIcon setProfilePicture={setProfilePicture} />}
      name={user?.name}
      image={user?.profileImage || ''}
      bgColor="#DBEAFE"
    />
  );
};

export default UpdateProfileImage;

import { useQueryClient } from '@tanstack/react-query';
import ContactCard from 'components/ContactCard';
import ProfileCover from 'components/ProfileCover';
import { useSingleUser } from 'queries/users';
import React from 'react';
import { useParams } from 'react-router-dom';
interface IUserDetailProps {}

const UserDetail: React.FC<IUserDetailProps> = () => {
  const params = useParams();

  const userId = params?.userId;

  const queryClient = useQueryClient();

  const { data, isLoading } = useSingleUser(userId || '');

  const apiData = data?.data?.result?.data;

  return (
    <div>
      <div className="w-full">
        <ProfileCover
          fullName={apiData?.fullName}
          status={apiData?.status}
          designation={apiData?.fullName}
          department={apiData?.fullName}
          location={apiData?.fullName}
        />
      </div>
      <div className="w-1/4">
        <ContactCard email={apiData?.workEmail} contact={apiData?.workEmail} />
      </div>
    </div>
  );
};

export default UserDetail;

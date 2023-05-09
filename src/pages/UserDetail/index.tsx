import ContactCard from 'components/ContactCard';
import ProfileCover from 'components/ProfileCover';
import React from 'react';
import { useParams } from 'react-router-dom';
interface IUserDetailProps {}

const UserDetail: React.FC<IUserDetailProps> = () => {
  const params = useParams();
  return (
    <div>
      {/* UserDetail Page {params.userId} */}
      <div className="w-full">
        <ProfileCover />
      </div>
      <div className="w-1/4">
        <ContactCard />
      </div>
    </div>
  );
};

export default UserDetail;

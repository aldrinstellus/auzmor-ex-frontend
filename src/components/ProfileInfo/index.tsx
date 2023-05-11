import React from 'react';
import AboutMe from './components/AboutMe';
import ProfessionalDetails from './components/ProfessionalDetails';
import PersonalDetails from './components/PersonalDetails';

export interface IProfileInfoProps {
  profileDetails: any;
  canEdit?: boolean;
}

const ProfileInfo: React.FC<IProfileInfoProps> = ({
  profileDetails,
  canEdit,
}) => {
  return (
    <>
      <AboutMe aboutMe={profileDetails?.fullName} canEdit={canEdit} />
      <ProfessionalDetails
        dateOfJoin={profileDetails?.createdAt}
        timezone={profileDetails?.createdAt}
        canEdit={canEdit}
      />
      <PersonalDetails
        canEdit={canEdit}
        dateOfBirth={profileDetails?.createdAt}
        gender="s'he"
        address="4517 Washington Ave. Manchester, Kentucky 39495"
        maritalStatus="Married"
        skills={[
          'Techinal Analysis',
          'Fundamental Analysis',
          'Blockchain',
          'Painting',
        ]}
      />
    </>
  );
};

export default ProfileInfo;

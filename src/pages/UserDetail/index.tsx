import React from 'react';
import { useParams } from 'react-router-dom';
interface IUserDetailProps {}

const UserDetail: React.FC<IUserDetailProps> = () => {
  const params = useParams();
  return <div>UserDetail Page {params.userId}</div>;
};

export default UserDetail;

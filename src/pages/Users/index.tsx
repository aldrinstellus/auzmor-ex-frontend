import React, { useEffect, useState } from 'react';
import Button, { Variant } from 'components/Button';
import UserCard from './components/UserCard';
import TabSwitch from './components/TabSwitch';
import { IPostUsersResponse, useUsers } from 'queries/users';
import InviteUserModal from './components/InviteUserModal';

interface IUsersProps {}

const tabs = [
  {
    label: 'People',
  },
  {
    label: 'Teams',
  },
];

const Users: React.FC<IUsersProps> = () => {
  const { data: users, isLoading } = useUsers({});
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  return (
    <>
      <div className="bg-white px-8 py-9 rounded-9xl w-[100%] h-[100%]">
        <div className="flex justify-between">
          <span className="text-2xl font-bold">People Hub</span>
          <div className="flex">
            <Button
              className="flex mr-2"
              label="View Organization Chart"
              variant={Variant.Secondary}
              leftIcon="convertShape"
            />
            <Button
              className="flex"
              label="Add Members"
              leftIcon="add"
              onClick={() => {
                setShowAddUserModal(true);
              }}
            />
          </div>
        </div>

        <div className="mt-6">
          <TabSwitch tabs={tabs} />
        </div>
        <div className="flex justify-between mt-6 ">
          <div className="flex-none">
            <Button
              label="My Teams"
              variant={Variant.Secondary}
              className="mr-4"
            />
            <Button
              label="All Members"
              variant={Variant.Secondary}
              className="mr-4"
            />
          </div>
        </div>

        <div className="mt-6 text-neutral-500">
          Showing {!isLoading && users.result.data.length} results
        </div>
        <div className="flex flex-wrap mt-6">
          {!isLoading &&
            users.result.data.length > 0 &&
            users.result.data.map((user: any, index: number) => (
              <div key={user.id} className={index % 5 !== 0 ? 'ml-6' : ''}>
                <UserCard key={user.id} {...user} />
              </div>
            ))}
          {isLoading && <>Loading ...</>}
        </div>
      </div>

      <InviteUserModal
        showModal={showAddUserModal}
        setShowAddUserModal={setShowAddUserModal}
        closeModal={() => setShowAddUserModal(false)}
      />
    </>
  );
};

export default Users;

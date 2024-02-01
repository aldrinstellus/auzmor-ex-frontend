import AvatarList from 'components/AvatarList';
import Button, { Size, Variant } from 'components/Button';
import Icon from 'components/Icon';
import { useState } from 'react';

const MembersWidget = () => {
  const [show, setShow] = useState(true);

  return (
    <div className="bg-white p-6 rounded-9xl">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setShow((t) => !t)}
      >
        <div className="font-bold">23 Members</div>
        <Icon
          name={show ? 'arrowUp' : 'arrowDown'}
          size={20}
          color="text-neutral-900"
        />
      </div>
      {show ? (
        <>
          <div className="mt-3">
            <AvatarList
              display={8}
              className="!-space-x-5"
              users={[
                {
                  id: 1,
                  name: 'John Doe',
                  image: 'https://i.pravatar.cc/300',
                },
                {
                  id: 2,
                  name: 'John Doe',
                  image: 'https://i.pravatar.cc/300',
                },
                {
                  id: 3,
                  name: 'John Doe',
                  image: 'https://i.pravatar.cc/300',
                },
                {
                  id: 4,
                  name: 'John Doe',
                  image: 'https://i.pravatar.cc/300',
                },
              ]}
              moreCount={23}
            />
          </div>
          <div className="mt-3">
            <Button
              variant={Variant.Secondary}
              size={Size.Small}
              className="w-full"
              label="View all members"
              dataTestId="my-teams-cta"
              // onClick={() => navigate('/teams?tab=myTeams')}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default MembersWidget;

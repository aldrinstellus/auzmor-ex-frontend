import React from 'react';
import Card from 'components/Card';
import Icon from 'components/Icon';
import useModal from 'hooks/useModal';
import { useInfiniteTeams } from 'queries/teams';
import { isFiltersEmpty } from 'utils/misc';
import useAuth from 'hooks/useAuth';
import TeamCard from './components/TeamCard';
import Button, { Size, Variant } from 'components/Button';
import { useNavigate } from 'react-router-dom';

const MyTeamWidget = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [open, openCollpase, closeCollapse] = useModal(true, false);

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteTeams({
    q: isFiltersEmpty({
      userId: user?.id,
      limit: 3,
    }),
  });

  const teamsData = data?.pages.flatMap((page) => {
    return page?.data?.result?.data.map((team: any) => {
      try {
        return team;
      } catch (e) {
        console.log('Error', { team });
      }
    });
  });

  const toggleModal = () => {
    if (open) closeCollapse();
    else openCollpase();
  };

  return (
    <Card className="py-6 rounded-9xl">
      <div
        className="px-6 flex items-center justify-between cursor-pointer"
        onClick={toggleModal}
      >
        <div className="font-bold">My Teams</div>
        <Icon name={open ? 'arrowUp' : 'arrowDown'} size={20} />
      </div>
      <div
        className={`transition-max-h duration-300 ease-in-out overflow-hidden ${
          open ? 'max-h-[1000px]' : 'max-h-[0]'
        }`}
      >
        <div className="px-4 flex flex-col gap-4 mt-4">
          {(() => {
            if (isLoading) {
              return (
                <>
                  {[...Array(3)].map((element) => (
                    <div key={element}>Loading</div>
                  ))}
                </>
              );
            }
            if (teamsData && teamsData?.length > 0) {
              return (
                <>
                  <div className="divide-y divide-neutral-200">
                    {teamsData?.map((team: any) => (
                      <div key={team.id} className="py-2">
                        <TeamCard {...team} />
                      </div>
                    ))}
                  </div>

                  {hasNextPage && (
                    <Button
                      variant={Variant.Secondary}
                      size={Size.Small}
                      className="py-[7px]"
                      label="My Teams"
                      dataTestId="my-teams-cta"
                      onClick={() => navigate('/teams?tab=myTeams')}
                    />
                  )}
                </>
              );
            }
            return <div></div>;
          })()}
        </div>
      </div>
    </Card>
  );
};

export default MyTeamWidget;

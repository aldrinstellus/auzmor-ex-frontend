import clsx from 'clsx';
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import Card from 'components/Card';
import { formatDate } from 'components/CelebrationWidget/utils';
import Icon from 'components/Icon';
import { useCurrentTimezone } from 'hooks/useCurrentTimezone';
import { useShouldRender } from 'hooks/useShouldRender';
import { useInfiniteLearnEvents } from 'queries/learn';
import React, { FC, useMemo } from 'react';
import { getLearnUrl } from 'utils/misc';
import { getTimeDifference, getTimeFromNow } from 'utils/time';

interface IEventWidgetProps {
  className?: string;
  isLive?: boolean;
}
const ID = 'EventWidget';

const EventWidget: FC<IEventWidgetProps> = ({
  className = '',
  isLive = false, // will handle this case for ongoing events ..
}) => {
  const { currentTimezone } = useCurrentTimezone();
  const style = useMemo(
    () => clsx({ 'min-w-[240px] ': true, [className]: true }),
    [className],
  );
  const shouldRender = useShouldRender(ID);
  if (!shouldRender) {
    return <></>;
  }
  const { data: upcomingEvents } = useInfiniteLearnEvents({
    q: { limit: 1, filter: 'UPCOMING' },
  });
  const events = upcomingEvents?.pages?.flatMap((page: any) =>
    page?.data?.result?.data.map((event: any) => event),
  );
  const event = events?.[0];
  const userTimezone = event?.timezone || currentTimezone || 'Asia/Kolkata';
  const startDate = event?.start_date;
  const endDate = event?.end_date;

  return (
    <div>
      {events?.length ? (
        <div className={style}>
          <div className="flex justify-between items-center ">
            <div className="text-base font-bold">Events</div>
            <Button
              label={'View all'}
              onClick={() => {
                window.location.replace(
                  `${getLearnUrl()}/user/trainings?type=events&tab=UPCOMING`,
                );
              }}
              className="bg-transparent !text-primary-500 hover:!text-primary-600 hover:!bg-transparent active:!bg-transparent active:!text-primary-700"
            />
          </div>
          <div className="mt-2">
            <Card className="w-full relative h-[353px] overflow-hidden group/card">
              <>
                <img
                  src={event?.image_url}
                  className="w-full  object-cover group-hover/card:scale-[1.10]"
                  style={{
                    transition: 'all 0.25s ease-in 0s',
                    animation: '0.15s ease-in 0s 1 normal both running fadeIn',
                  }}
                />
                {!isLive && (
                  <>
                    <div
                      className="cursor-pointer rounded-lg absolute"
                      style={{
                        color: 'rgba(0,0,0,.87)',
                        boxSizing: 'inherit',
                        background:
                          'linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%)',
                        inset: '0px',
                        zIndex: 2,
                      }}
                    />
                    <div className="absolute z-10 flex top-0 left-4 right-4 bottom-32 justify-center z-100 items-center inset-0">
                      <Button
                        label={'Join event'}
                        onClick={() => {
                          window.open(event?.conference_url, '_blank');
                        }}
                        className="w-full bg-white text-white bg-opacity-20 border-white"
                      />
                    </div>
                  </>
                )}
                <div
                  className={`absolute  ${
                    isLive ? 'bg-primary-500' : 'bg-white border-neutral-200 '
                  } z-10 gap-1 flex top-4 left-4 px-2.5 py-1 text-xs font-medium rounded  `}
                >
                  <Icon
                    name={isLive ? 'radar' : 'videoPlay'}
                    size={18}
                    color={isLive ? 'text-white' : 'text-primary-500'}
                  />
                  <p
                    className={`text-xs ${
                      isLive ? 'text-white' : 'text-primary-500'
                    } font-semibold`}
                  >
                    {`Starts in ${getTimeFromNow(endDate)}`}
                  </p>
                </div>

                <div className="absolute min-h-[160px] bg-white  bottom-0 left-0 flex flex-col p-4 z-10 gap-2 w-full">
                  <div className="flex gap-1">
                    {event?.categories.map((d: any) => {
                      return (
                        <div
                          key={d?.id}
                          className="px-2 py-1 rounded bg-primary-100  text-center text-primary-500  text-xs font-medium"
                        >
                          {d?.title}
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-neutral-900 font-semibold text-base">
                    {event?.name}
                  </div>
                  <div className="flex gap-2">
                    <div className="flex gap-1 items-center">
                      <Icon
                        name="calendar"
                        size={16}
                        color="text-primary-500"
                      />
                      <p className="text-xs text-neutral-900">
                        {formatDate(startDate, userTimezone, 'event')}
                      </p>
                    </div>
                    <div className="flex gap-1 items-center">
                      <Icon name="clock" size={16} color="text-primary-500" />
                      <p className="text-xs text-neutral-900">
                        {getTimeDifference(startDate, endDate, userTimezone)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center  gap-2">
                    <Avatar
                      name={event?.created_by?.full_name}
                      image={event?.created_by?.image_url}
                      size={32}
                    />

                    <div className="text-neutral-500 text-xs font-normal">
                      {event?.created_by?.full_name}
                    </div>

                    <div className="flex ml-auto gap-1 items-center">
                      <Icon name="video" size={20} color="text-primary-500" />
                      <p className="text-xs text-neutral-500">
                        {event?.session_type}
                      </p>
                    </div>
                  </div>
                  {/* <div className="flex items-center gap-2"> // need  attendees info in api.
                    <AvatarList
                      size={32}
                      users={['asd', 'asdas', 'asdasd', 'asdasd']}
                      moreCount={20}
                      className="-space-x-[12px]"
                      avatarClassName="!b-[1px]"
                    />

                    <div className="text-xs  text-neutral-500 underline font-normal">
                      More attendees
                    </div>
                  </div> */}
                  {/* {isLive && (
                    <Button label={'Join event'} className="w-full " />
                  )} */}
                </div>
              </>
            </Card>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EventWidget;

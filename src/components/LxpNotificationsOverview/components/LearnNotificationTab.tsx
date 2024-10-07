import { forwardRef } from 'react';

type LearnNotificationsList = {
  mentions?: boolean;
  className?: string;
};

export enum ActionType {
  REACTION = 'REACTION',
  COMMENT = 'COMMENT',
  MENTION = 'MENTION',
  SCHEDULE_POST = 'SCHEDULE_POST',
  SHOUTOUT = 'SHOUT_OUT',
  NEW_MEMBERS_TO_TEAM = 'NEW_MEMBERS_TO_TEAM',
  ACKNOWLEDGEMENT_REMINDER = 'ACKNOWLEDGEMENT_REMINDER',
  SCHEDULE_POST_PUBLISH = 'SCHEDULE_POST_PUBLISH',
  POST_PRE_PUBLISH = 'POST_PRE_PUBLISH',
}

const LearnNotificationsList = forwardRef(() => {
  return <>learn Notification</>;
});

//     return isLoading ? (
//       <NotificationsOverviewSkeleton />
//     ) : (
//       <div>
//         {!isError && data.data?.result?.data?.length ? (
//           <div className={`flex flex-col overflow-y-auto ${className}`}>
//             {data?.data?.result?.data?.map((items: any, index: number) => (
//               <div key={index} onClick={() => ref?.current?.click()}>
//                 <div> lear notification listing {items} </div>
//                 <Divider className="bg-neutral-200" />
//               </div>
//             ))}
//             <Divider />
//             <div className="text-neutral-500 text-sm font-normal flex justify-center py-4">
//               That&apos;s all for now
//             </div>
//           </div>
//         ) : (
//           <div className="w-full flex flex-col items-center py-12">
//             <div className="flex">
//               <img
//                 src={NoNotification}
//                 alt="Apps Not Found"
//                 height={140}
//                 width={165}
//               />
//             </div>
//             <p className="text-neutral-900 font-semibold text-lg mt-2">
//               No Notifications yet
//             </p>
//             <p className="text-neutral-500 text-sm font-medium text-center mt-2.5">
//               We will notify you once we have <br /> something for you
//             </p>
//           </div>
//         )}
//         {isError && (
//           <div className="flex items-center justify-center p-6">
//             Error loading notifications
//           </div>
//         )}
//       </div>
//     );
//   },
// );

LearnNotificationsList.displayName = 'LearnNotificationsList';

export default LearnNotificationsList;

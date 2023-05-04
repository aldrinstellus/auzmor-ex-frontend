import Avatar from 'components/Avatar';
import Card from 'components/Card';
import React, { ReactElement } from 'react';
import { CircularIcon } from '../CircularIcon';

type MentionUserCardProps = {
  fullName: string;
  image?: string;
  active?: boolean;
  email?: string;
  className?: string;
};

export const MentionUserCard: React.FC<MentionUserCardProps> = (
  props: MentionUserCardProps,
): ReactElement => {
  return (
    <Card className={props?.className}>
      <div className="flex m-5 items-center justify-between gap-x-3">
        <div>
          {/* Profile pic goes here */}
          <Avatar
            size={80}
            name={props.fullName}
            image={props.image}
            active={props.active}
          />
        </div>
        <div className="flex items-start flex-col gap-y-2">
          {/* Rest of info goes here */}
          <span className="text-neutral-900 font-bold text-base">
            {props.fullName}
          </span>
          <span className="text-neutral-500 font-normal text-sm">
            {props?.email}
          </span>
          <div className="flex items-center justify-between gap-x-11">
            <span className="flex items-center gap-x-3">
              <CircularIcon name="magicStar" className="m-2" />
              <CircularIcon name="people" className="m-2" />
              <CircularIcon name="convertShape" className="m-2" />
            </span>
            <span className="text-neutral-900 font-bold text-sm">
              View Profile
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

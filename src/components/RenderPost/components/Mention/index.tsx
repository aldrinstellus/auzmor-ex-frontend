import React, { ReactElement, useState } from 'react';
import { MentionUserCard } from '../MentionUserCard';

type MentionProps = {
  value: string;
  fullName: string;
  image?: string;
  active?: boolean;
  email?: string;
};

export const Mention: React.FC<MentionProps> = (
  props: MentionProps,
): ReactElement => {
  const [showUserCard, setShowUserCard] = useState<boolean>(false);
  return (
    <span className="relative">
      {showUserCard && (
        <MentionUserCard
          fullName={props.fullName}
          email={props?.email}
          image={props?.image}
          active={props?.active}
          className="absolute -top-[170px] z-10 shadow-lg transition-opacity duration-200 min-w-max"
        />
      )}
      <span
        onMouseEnter={() => setShowUserCard(true)}
        onMouseLeave={() => setShowUserCard(false)}
        className="cursor-pointer mention"
        contentEditable="false"
      >
        {props?.value}
      </span>
    </span>
  );
};

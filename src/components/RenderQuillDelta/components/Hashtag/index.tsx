import React, { ReactElement } from 'react';

type HashtagProps = {
  value: string;
};

export const Hashtag: React.FC<HashtagProps> = (
  props: HashtagProps,
): ReactElement => {
  return (
    <span onClick={() => {}} className="hashtag">{`#${props?.value}`}</span>
  );
};

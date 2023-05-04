import { useInfiniteFeed } from 'queries/post';
import React, { ReactElement } from 'react';

type HashtagProps = {
  value: string;
};

export const Hashtag: React.FC<HashtagProps> = (
  props: HashtagProps,
): ReactElement => {
  const { refetch } = useInfiniteFeed();

  return (
    <span
      onClick={() => {
        refetch({ queryKey: ['feed', { hashtags: [props.value] }] });
      }}
      className="hashtag"
    >{`#${props?.value}`}</span>
  );
};

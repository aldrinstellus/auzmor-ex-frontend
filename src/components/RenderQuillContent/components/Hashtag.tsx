import React, { ReactElement, useContext, useRef } from 'react';
import { CreatePostContext } from 'contexts/CreatePostContext';

type HashtagProps = {
  value: string;
};

const Hashtag: React.FC<HashtagProps> = ({ value }): ReactElement => {
  const hashtagRef = useRef<HTMLElement>(null);
  const { setFeedHashtag } = useContext(CreatePostContext);
  return (
    <span
      onClick={() => {
        if (hashtagRef?.current) {
          setFeedHashtag(hashtagRef?.current?.innerHTML);
        }
      }}
      className="hashtag"
    >
      #<span ref={hashtagRef}>{value}</span>
    </span>
  );
};

export default Hashtag;

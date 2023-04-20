import React from 'react';

import ArtDeco from 'components/ArtDeco';
import Post from 'components/Post';
import { feeds } from 'mocks/feed';

interface IFeedProps {}

const Feed: React.FC<IFeedProps> = () => {
  return (
    <>
      <ArtDeco />
      {feeds?.map((feed) => (
        <div key={feed.uuid}>
          <Post content={feed.content.html} />
        </div>
      ))}
    </>
  );
};

export default Feed;

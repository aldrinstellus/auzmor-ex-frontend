import React from 'react';

import ArtDeco from 'components/ArtDeco';
import Post from 'components/Post';
import CreatePost from 'components/CreatePost';

interface IFeedProps {}

const Feed: React.FC<IFeedProps> = () => {
  return (
    <>
      <ArtDeco />
      <Post />
    </>
  );
};

export default Feed;

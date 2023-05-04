import React from 'react';
import CreatePostProvider from 'contexts/CreatePostContext';
import CreatePostModal from './components/CreatePostModal';
import { IFeed } from 'pages/Feed';

enum PostBuilderMode {
  Create = 'CREATE',
  Edit = 'EDIT',
}

export interface IPostBuilderProps {
  data?: IFeed;
  showModal: boolean;
  setShowModal: (flag: boolean) => void;
  mode?: PostBuilderMode;
}

const PostBuilder: React.FC<IPostBuilderProps> = ({
  data,
  showModal,
  mode = PostBuilderMode.Create,
  setShowModal,
}) => {
  return (
    <CreatePostProvider>
      <CreatePostModal
        showModal={showModal}
        setShowModal={setShowModal}
        data={data}
      />
    </CreatePostProvider>
  );
};

export default PostBuilder;

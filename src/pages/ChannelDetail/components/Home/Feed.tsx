/* eslint-disable @typescript-eslint/no-unused-vars */
import CreatePostCard from 'components/PostBuilder/components/CreatePostCard';
import FinishSetup from './FinishSetup';
import Welcome from './Welcome';
import useModal from 'hooks/useModal';
import { IChannel } from 'stores/channelStore';
import { FC } from 'react';

type AppProps = {
  channelData?: IChannel;
};
const Feed: FC<AppProps> = ({ channelData }) => {
  const [open, showOpen, closeOpen] = useModal();
  return (
    <div>
      <div>
        <CreatePostCard openModal={showOpen} />
      </div>
      <Welcome />
      <FinishSetup channelData={channelData} />
    </div>
  );
};

export default Feed;

import useAuth from './useAuth';
import { CHANNEL_ROLE, IChannel } from 'stores/channelStore';

export const useChannelRole = (channel: IChannel) => {
  const { user } = useAuth();

  return {
    isChannelAdmin: channel?.member?.role == CHANNEL_ROLE.Admin,
    isMember: channel?.member?.role == CHANNEL_ROLE.Member,
    isChannelOwner: user?.id === channel?.createdBy?.userId,
  };
};

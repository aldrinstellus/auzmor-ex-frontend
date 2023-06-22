import { IPost } from 'queries/post';
import { create } from 'zustand';

export interface IFeedStore {
  feed: { [key: string]: IPost };
  setFeed: (feed: { [key: string]: IPost }) => void;
}

export const useFeedStore = create<IFeedStore>((set) => ({
  feed: {},
  setFeed: (feed) =>
    set(() => ({
      feed: { ...feed },
    })),
}));

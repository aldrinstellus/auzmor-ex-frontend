import { IPost } from 'queries/post';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface IFeedStore {
  feed: { [key: string]: IPost };
  activeFeedPostCount: number;
  setActiveFeedPostCount: (count: number) => void;
  getPost: (id: string) => IPost;
  setFeed: (feed: { [key: string]: IPost }) => void;
  updateFeed: (id: string, post: IPost) => void;
}

export const useFeedStore = create(
  immer<IFeedStore>((set, get) => ({
    feed: {},
    activeFeedPostCount: 0,
    setActiveFeedPostCount: (count) =>
      set((state) => {
        state.activeFeedPostCount = count;
      }),
    getPost: (id) => get().feed[id],
    setFeed: (feed) =>
      set((state) => {
        state.feed = feed;
      }),
    updateFeed: (id, post) =>
      set((state) => {
        state.feed[id] = post;
      }),
  })),
);

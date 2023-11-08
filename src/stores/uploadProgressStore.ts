import { ReactNode } from 'react';
import { create } from 'zustand';

interface IUploadProgressStore {
  progress: number;
  heading: string;
  showUploadProgress: boolean;
  content: null | ReactNode;
  setProgress: (progress: number) => void;
  setHeading: (heading: string) => void;
  setShowUploadProgress: (showUploadProgress: boolean) => void;
  setContent: (content: null | ReactNode) => void;
}

export const useUploadProgressStore = create<IUploadProgressStore>((set) => ({
  progress: 0,
  heading: 'Uploading 10 out of 20 members...',
  showUploadProgress: false,
  content: null,
  setProgress: (progress) => set(() => ({ progress })),
  setHeading: (heading) => set(() => ({ heading })),
  setShowUploadProgress: (showUploadProgress) =>
    set(() => ({ showUploadProgress })),
  setContent: (content) => set(() => ({ content })),
}));

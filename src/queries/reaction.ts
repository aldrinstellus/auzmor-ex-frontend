import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  QueryFunctionContext,
} from '@tanstack/react-query';
import { IComment } from 'components/Comments';
import { useCommentStore } from 'stores/commentStore';
import apiService from 'utils/apiService';
import _ from 'lodash';

export interface IReactions {
  entityId: string;
  entityType: string;
  reaction?: string;
  limit?: number;
  cursor?: string;
}

interface IDelete {
  entityId: string;
  entityType: string;
  id: string;
}

interface IContent {
  html: string;
  text: string;
  editor: Record<string, any>;
}

interface IComments {
  entityId: string;
  entityType: string;
  limit?: number;
  page?: number;
  content?: IContent;
  hashtags?: Array<object>;
  mentions?: Array<object>;
}

export interface IGetReaction {
  type: string;
  reaction: string;
  createdBy: ICreatedBy;
  entityId: string;
  entityType: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface ICreatedBy {
  department: string;
  designation: string;
  fullName: string;
  profileImage: { id: string; original: string; blurHash: string };
  status: string;
  userId: string;
  workLocation: string;
  email: string;
}

export const createReaction = async (payload: IReactions) => {
  const { data } = await apiService.post('/reactions', payload);
  return data;
};

export const getReactions = async ({
  pageParam = null,
  queryKey,
}: QueryFunctionContext<any>) => {
  const { data } = await apiService.get(!!pageParam ? pageParam : `reactions`, {
    ...queryKey[1],
  });
  return data;
};

export const useReactions = (
  q: IReactions,
  config?: UseInfiniteQueryOptions,
) => {
  return useInfiniteQuery({
    queryKey: ['reactions', q],
    queryFn: getReactions,
    staleTime: 0,
    getNextPageParam: (lastPage: any) => {
      return lastPage?.paging?.next;
    },
    getPreviousPageParam: (currentPage: any) => {
      return currentPage?.paging?.previous;
    },
    ...config,
  });
};

export const deleteReaction = async (payload: IDelete) => {
  const { entityId, entityType, id } = payload;

  await apiService.delete(`/reactions/${id}`, { entityId, entityType });
};

export const deleteComment = async (id: string) => {
  await apiService.delete(`/comments/${id}`);
};

export const getComments = async (
  context: QueryFunctionContext<
    (string | Record<string, any> | undefined)[],
    any
  >,
  comment: {
    [key: string]: IComment;
  },
  setComment: (feed: { [key: string]: IComment }) => void,
) => {
  let response = null;
  if (!!!context.pageParam) {
    response = await apiService.get('/comments', context.queryKey[1]);
    setComment({
      ...comment,
      ..._.chain(response.data.result.data).keyBy('id').value(),
    });
    response.data.result.data = response.data.result.data.map(
      (eachPost: IComment) => ({ id: eachPost.id }),
    );
    return response;
  } else {
    response = await apiService.get(context.pageParam);
    setComment({
      ...comment,
      ..._.chain(response.data.result.data).keyBy('id').value(),
    });
    response.data.result.data = response.data.result.data.map(
      (eachPost: IComment) => ({ id: eachPost.id }),
    );
    return response;
  }
};

export const useInfiniteComments = (q: IComments) => {
  const { comment, setComment } = useCommentStore();
  return {
    ...useInfiniteQuery({
      queryKey: ['comments', q],
      queryFn: (context) => getComments(context, comment, setComment),
      getNextPageParam: (lastPage: any) => {
        return lastPage?.data?.result?.paging?.next;
      },
      getPreviousPageParam: (currentPage: any) => {
        return currentPage?.data?.result?.paging?.prev;
      },
    }),
    comment,
  };
};

export const createComments = async (payload: IComments) => {
  const { data } = await apiService.post(`/comments`, payload);
  return data;
};

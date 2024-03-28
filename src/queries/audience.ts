import {
  QueryFunctionContext,
  useInfiniteQuery,
  // useQuery,
} from '@tanstack/react-query';
import apiService from 'utils/apiService';

export const getAllUser = async ({
  pageParam = null,
  queryKey,
}: QueryFunctionContext<(Record<string, any> | undefined | string)[], any>) => {
  if (pageParam === null) {
    return await apiService.get('/users', queryKey[1]);
  } else return await apiService.get(pageParam);
};
const getAudience = async ({
  pageParam = null,
  queryKey,
}: QueryFunctionContext<any>) => {
  const [_queryKey, entity, entityId, params] = queryKey;
  if (pageParam === null) {
    return await apiService.get(`/${entity}/${entityId}/audience`, {
      limit: 10,
      ...(params || {}),
    });
  } else return await apiService.get(pageParam);
};

export const useAudience = (
  entity: string,
  entityId: string,
  rest?: Record<string, any>,
  params?: Record<string, string>,
) => {
  return useInfiniteQuery({
    queryKey: ['audience', entity, entityId, params],
    queryFn: getAudience,
    getNextPageParam: (lastPage: any) => {
      const pageDataLen = lastPage?.data?.result?.data?.length;
      const pageLimit = lastPage?.data?.result?.paging?.limit;
      if (pageDataLen < pageLimit) {
        return null;
      }
      return lastPage?.data?.result?.paging?.next;
    },
    getPreviousPageParam: (currentPage: any) => {
      return currentPage?.data?.result?.paging?.prev;
    },
    staleTime: 5 * 60 * 1000,
    ...rest,
  });
};

import { QueryFunctionContext, useInfiniteQuery } from '@tanstack/react-query';
import apiService from 'utils/apiService';

export interface ITeamPayload {
  name: string;
  category: string;
  description?: string;
}

export const getAllTeams = async ({
  pageParam = null,
  queryKey,
}: QueryFunctionContext<(Record<string, any> | undefined | string)[], any>) => {
  if (pageParam === null) {
    return apiService.get('/teams', queryKey[1]);
  } else return apiService.get(pageParam);
};

export const createTeams = async (payload: ITeamPayload) => {
  const data = await apiService.post('/teams', payload);
  return new Promise((res) => {
    res(data);
  });
};

export const updateTeam = async (id: string, payload: ITeamPayload) => {
  await apiService.put(`/teams/${id}`, payload);
};

// delete team by id -> teams/:id
export const deleteTeam = async (id: string) => {
  const data = await apiService.delete(`/teams/${id}`);
  return new Promise((res) => {
    res(data);
  });
};

// ------------------ React Query -----------------------

export const useInfiniteTeams = (q?: Record<string, any>) => {
  return useInfiniteQuery({
    queryKey: ['teams', q],
    queryFn: getAllTeams,
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
  });
};

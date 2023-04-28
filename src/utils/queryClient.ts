import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 15 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export default queryClient;

export const getRelatedCacheKeys = (
  queryClient: QueryClient,
  targetKey: string,
) => {
  return queryClient
    .getQueryCache()
    .getAll()
    .map((query: { queryKey: any }) => query.queryKey)
    .filter((key: string | any[]) =>
      Array.isArray(key) ? key.includes(targetKey) : key === targetKey,
    );
};

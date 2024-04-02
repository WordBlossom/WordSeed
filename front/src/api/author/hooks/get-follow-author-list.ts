import {
  QueryClient,
  dehydrate,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { FollowAuthorListDTO, QueryFnType } from "../types";
import { InfiniteQueryConfig } from "@/lib/react-query";
import { authorQuery } from "..";

const REQUEST_SIZE = 10;

interface UseAuthorListOptions {
  params: FollowAuthorListDTO;
  config?: InfiniteQueryConfig<QueryFnType<FollowAuthorListDTO>>;
}

interface PrefetchUseAuthorListOptions extends UseAuthorListOptions {
  queryClient: QueryClient;
}

export function useFollowAuthorList({ params, config }: UseAuthorListOptions) {
  const { queryKey, queryFn } = authorQuery.followAuthorList();

  return useInfiniteQuery({
    ...config,
    queryKey: queryKey(params),
    queryFn: ({ pageParam }) =>
      queryFn({ ...params, size: REQUEST_SIZE, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const morePagesExist = lastPage?.users?.length === REQUEST_SIZE;
      if (!morePagesExist) return undefined;
      return allPages.length;
    },
    select: (data) => ({
      ...data,
      pages: data.pages.flatMap((page) => page.users),
    }),
  });
}

export async function usePrefetchFollowAuthorList({
  queryClient,
  params,
  config,
}: PrefetchUseAuthorListOptions) {
  const { queryKey, queryFn } = authorQuery.followAuthorList();

  await queryClient.prefetchInfiniteQuery({
    ...config,
    queryKey: queryKey(params),
    queryFn: ({ pageParam }) =>
      queryFn({ ...params, size: 5, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const morePagesExist = lastPage?.users?.length === 5;
      if (!morePagesExist) return undefined;
      return allPages.length + 1;
    },
    pages: 1,
  });
  return dehydrate(queryClient);
}

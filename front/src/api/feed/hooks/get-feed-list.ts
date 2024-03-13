import {
  QueryClient,
  useInfiniteQuery,
  dehydrate,
} from "@tanstack/react-query";
import { InfiniteQueryConfig } from "@/lib/react-query";
import { FeedType, ParamsByType, QueryFnType } from "@/api/feed/types";
import { feedListQuery } from "@/api/feed/apis/get-feed-api";

const REQUEST_SIZE = 5;
export const DEFAULT_POST_TYPE = "TEXT,PAINT,VIDEO,MUSIC";
export const DEFAULT_SORT = "DATE_DSC";

interface UseFeedListOptions<T extends FeedType> {
  params: ParamsByType<T>;
  type: T;
  config?: InfiniteQueryConfig<QueryFnType<T>>;
}

interface PrefetchUseFeedListOptions<T extends FeedType>
  extends UseFeedListOptions<T> {
  queryClient: QueryClient;
}

export function useFeedList<T extends FeedType>({
  params,
  type,
  config,
}: UseFeedListOptions<T>) {
  const { queryKey, queryFn } = feedListQuery[type]();

  return useInfiniteQuery({
    ...config,
    queryKey: queryKey(params),
    queryFn: ({ pageParam }) =>
      queryFn({
        ...params,
        size: REQUEST_SIZE,
        page: pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const morePagesExist = lastPage?.posts?.length === REQUEST_SIZE;
      if (!morePagesExist) return undefined;
      return allPages.length + 1;
    },
    select: (data) => ({
      ...data,
      pages: data.pages.flatMap((page) => page.posts),
    }),
  });
}

export async function usePrefetchFeedList<T extends FeedType>({
  queryClient,
  type,
  params,
  config,
}: PrefetchUseFeedListOptions<T>) {
  const { queryKey, queryFn } = feedListQuery[type]();

  await queryClient.prefetchInfiniteQuery({
    ...config,
    queryKey: queryKey(params),
    queryFn: ({ pageParam }) =>
      queryFn({ ...params, size: 5, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const morePagesExist = lastPage?.posts?.length === 5;
      if (!morePagesExist) return undefined;
      return allPages.length + 1;
    },
    pages: 1,
  });
  return dehydrate(queryClient);
}

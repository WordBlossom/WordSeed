import { axios } from "@/lib/axios";
import {
  QueryClient,
  useInfiniteQuery,
  dehydrate,
} from "@tanstack/react-query";
import { InfiniteQueryConfig } from "@/lib/react-query";
import { FeedListDTO, FeedList } from "./types";

const REQUEST_SIZE = 5;
export const DEFAULT_POST_TYPE = "TEXT,PAINT,VIDEO,MUSIC";
export const DEFAULT_SORT = "DATE_DSC";

export async function getFeedList(params: FeedListDTO): Promise<FeedList> {
  return axios.get(`/post/list/word`, { params });
}

type QueryFnType = typeof getFeedList;

interface UseFeedListOptions {
  params: FeedListDTO;
  config?: InfiniteQueryConfig<QueryFnType>;
}

interface PrefetchUseFeedListOptions extends UseFeedListOptions {
  queryClient: QueryClient;
}

export function useFeedList({ params, config }: UseFeedListOptions) {
  return useInfiniteQuery({
    ...config,
    queryKey: ["FeedList", params],
    queryFn: ({ pageParam }) =>
      getFeedList({ ...params, size: REQUEST_SIZE, page: pageParam }),
    initialPageParam: 2,
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

export async function usePrefetchFeedList({
  queryClient,
  params,
  config,
}: PrefetchUseFeedListOptions) {
  await queryClient.prefetchInfiniteQuery({
    ...config,
    queryKey: ["FeedList", params],
    queryFn: ({ pageParam }) =>
      getFeedList({ ...params, size: 5, page: pageParam }),
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

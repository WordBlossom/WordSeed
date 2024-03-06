import { axios } from "@/lib/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FeedListDTO, FeedList } from "./types";
import { InfiniteQueryConfig } from "@/lib/react-query";

const REQUEST_SIZE = 5;

export async function getFeedList(params: FeedListDTO): Promise<FeedList> {
  return axios.get(`/post/list/word`, { params });
}

type QueryFnType = typeof getFeedList;
type UseFeedListOptions = {
  params: FeedListDTO;
  config?: InfiniteQueryConfig<QueryFnType>;
};

export function useFeedList({ params, config }: UseFeedListOptions) {
  return useInfiniteQuery({
    ...config,
    queryKey: ["FeedList", params],
    queryFn: ({ pageParam }) =>
      getFeedList({ ...params, size: REQUEST_SIZE, page: pageParam }),
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

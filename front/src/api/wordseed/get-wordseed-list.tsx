import { axios } from "@/lib/axios";
import {
  QueryClient,
  dehydrate,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { WordseedListDTO, WordseedList } from "./types";
import { InfiniteQueryConfig } from "@/lib/react-query";
import { axiosClient } from "@/lib/axios-client";

const REQUEST_SIZE = 10;

async function getWordseedList(params: WordseedListDTO): Promise<WordseedList> {
  return axiosClient.get(`/word/list`, { params });
}

type QueryFnType = typeof getWordseedList;
interface UseWordseedListOptions {
  params: WordseedListDTO;
  config?: InfiniteQueryConfig<QueryFnType>;
}

interface PrefetchUseWordseedListOptions extends UseWordseedListOptions {
  queryClient: QueryClient;
}

export function useWordseedList({ params, config }: UseWordseedListOptions) {
  return useInfiniteQuery({
    ...config,
    queryKey: ["wordseedList", params],
    queryFn: ({ pageParam }) =>
      getWordseedList({ ...params, size: REQUEST_SIZE, page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const morePagesExist = lastPage?.words?.length === REQUEST_SIZE;
      if (!morePagesExist) return undefined;
      return allPages.length + 1;
    },
    select: (data) => ({
      ...data,
      pages: data.pages.flatMap((page) => page.words),
    }),
  });
}

export async function usePrefetchWordseedList({
  queryClient,
  params,
  config,
}: PrefetchUseWordseedListOptions) {
  await queryClient.prefetchInfiniteQuery({
    ...config,
    queryKey: ["wordseedList", params],
    queryFn: ({ pageParam }) =>
      getWordseedList({ ...params, size: REQUEST_SIZE, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const morePagesExist = lastPage?.words?.length === REQUEST_SIZE;
      if (!morePagesExist) return undefined;
      return allPages.length + 1;
    },
    pages: 1,
  });
  return dehydrate(queryClient);
}

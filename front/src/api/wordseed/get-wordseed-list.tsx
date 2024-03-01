import { axios } from "@/lib/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { WordseedListDTO, WordseedList } from "./types";
import { InfiniteQueryConfig } from "@/lib/react-query";

const REQUEST_SIZE = 10;

async function getWordseedList(params: WordseedListDTO): Promise<WordseedList> {
  return axios.get(`/word/list`, { params });
}

type QueryFnType = typeof getWordseedList;
type UseWordseedListOptions = {
  params: WordseedListDTO;
  config?: InfiniteQueryConfig<QueryFnType>;
};

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

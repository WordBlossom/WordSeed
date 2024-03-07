import { axios } from "@/lib/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AuthorListDTO, AuthorList } from "./types";
import { InfiniteQueryConfig } from "@/lib/react-query";

const REQUEST_SIZE = 10;

async function getAuthorList(params: AuthorListDTO): Promise<AuthorList> {
  return axios.get(`/user/list`, { params });
}

type QueryFnType = typeof getAuthorList;
type UseAuthorListOptions = {
  params: AuthorListDTO;
  config?: InfiniteQueryConfig<QueryFnType>;
};

export function useAuthorList({ params, config }: UseAuthorListOptions) {
  return useInfiniteQuery({
    ...config,
    queryKey: ["AuthorList", params],
    queryFn: ({ pageParam }) =>
      getAuthorList({ ...params, size: REQUEST_SIZE, page: pageParam }),
    initialPageParam: 0,
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

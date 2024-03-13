import { axios } from "@/lib/axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AuthorListDTO, AuthorList, QueryFnType } from "../types";
import { InfiniteQueryConfig } from "@/lib/react-query";
import { authorQuery } from "..";

const REQUEST_SIZE = 10;

type UseAuthorListOptions = {
  params: AuthorListDTO;
  config?: InfiniteQueryConfig<QueryFnType<AuthorListDTO>>;
};

export function useAuthorList({ params, config }: UseAuthorListOptions) {
  const { queryKey, queryFn } = authorQuery.authorList();

  return useInfiniteQuery({
    ...config,
    queryKey: queryKey(params),
    queryFn: ({ pageParam }) =>
      queryFn({ ...params, size: REQUEST_SIZE, page: pageParam }),
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

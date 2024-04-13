import { useInfiniteQuery } from "@tanstack/react-query";
import { InfiniteQueryConfig } from "@/lib/react-query";
import { getCommentList } from "@/api/comment/api";
import { CommentListDTO } from "../types";

const REQUEST_SIZE = 6;

type QueryFnType = typeof getCommentList;
type UseCommentListOptions = {
  params: CommentListDTO;
  config?: InfiniteQueryConfig<QueryFnType>;
};

export function useCommentList({ params, config }: UseCommentListOptions) {
  return useInfiniteQuery({
    ...config,
    queryKey: ["commentList", params],
    queryFn: ({ pageParam }) =>
      getCommentList({ ...params, size: REQUEST_SIZE, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const morePagesExist = lastPage?.comments?.length === REQUEST_SIZE;
      if (!morePagesExist) return undefined;
      return allPages.length + 1;
    },
    select: (data) => ({
      ...data,
      pages: data.pages.flatMap((page) => page.comments),
    }),
  });
}

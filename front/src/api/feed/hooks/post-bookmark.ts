import { useMutation, InfiniteData } from "@tanstack/react-query";
import { getQueryClient, MutationConfig } from "@/lib/react-query";
import { postBookMark, bookMarkQuery } from "@/api/feed/apis/bookmark-api";
import {
  BookMarkAndLikeDTO,
  FeedDetail,
  FeedList,
  InfiniteQueriesUpdater,
} from "@/api/feed/types";

type useListBookMarkOptions = {
  postId: BookMarkAndLikeDTO["postId"];
  wordId: FeedDetail["wordId"];
  postType: FeedDetail["postType"];
  queryName: keyof typeof bookMarkQuery;
  config?: MutationConfig<typeof postBookMark>;
};

export const useListBookMark = ({
  postId,
  wordId,
  postType,
  queryName,
  config,
}: useListBookMarkOptions) => {
  const queryClient = getQueryClient();
  const { queryKey, queryFn } = bookMarkQuery[queryName](postId);

  const broadQueryKey = [
    "wordFeedList",
    {
      wordId: String(wordId),
    },
    { [postType]: true },
  ];

  const feedListQueryKey = { queryKey: broadQueryKey };

  const newData: InfiniteQueriesUpdater<FeedList> = (previousEachData) => {
    const updatedPages = previousEachData?.pages.map((page) => {
      const updatedPosts = page.posts.map((post) => {
        if (post.postId !== postId) return post;
        return {
          ...post,
          bookMarked: !post.bookMarked,
        };
      });
      return { ...page, posts: updatedPosts };
    });
    const updatedFeedList = {
      pages: updatedPages,
      pageParams: previousEachData?.pageParams,
    } as InfiniteData<FeedList>;
    return updatedFeedList;
  };

  return useMutation({
    ...config,
    mutationFn: queryFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousFeedLists =
        queryClient.getQueriesData<InfiniteData<FeedList>>(feedListQueryKey);

      queryClient.setQueriesData<InfiniteData<FeedList>>(
        feedListQueryKey,
        newData
      );

      return { previousFeedLists };
    },

    onError: (error, newData, context) => {
      context?.previousFeedLists.forEach((oldFeedList) => {
        const queryKey = oldFeedList[0];
        queryClient.setQueryData(queryKey, oldFeedList);
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

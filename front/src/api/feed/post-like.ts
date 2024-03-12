import { useMutation, InfiniteData } from "@tanstack/react-query";
import { getQueryClient, MutationConfig } from "@/lib/react-query";
import { postLike, likeQuery } from "./like-api";
import {
  BookMarkAndLikeDTO,
  FeedDetail,
  FeedList,
  InfiniteQueriesUpdater,
} from "./types";

type useListLikeOptions = {
  postId: BookMarkAndLikeDTO["postId"];
  wordId: FeedDetail["wordId"];
  postType: FeedDetail["postType"];
  queryName: keyof typeof likeQuery;
  config?: MutationConfig<typeof postLike>;
};

export const useListLike = ({
  postId,
  wordId,
  postType,
  queryName,
  config,
}: useListLikeOptions) => {
  const queryClient = getQueryClient();
  const { queryKey, queryFn } = likeQuery[queryName](postId);

  const broadQueryKey = [
    "wordFeedList",
    {
      wordId: String(wordId),
    },
    {
      [postType]: true,
    },
  ];

  const feedListQueryKey = { queryKey: broadQueryKey };

  const newData: InfiniteQueriesUpdater<FeedList> = (previousEachData) => {
    const updatedPages = previousEachData?.pages.map((page) => {
      const updatedPosts = page.posts.map((post) => {
        if (post.postId !== postId) return post;
        return {
          ...post,
          liked: !post.liked,
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

import { useMutation, InfiniteData } from "@tanstack/react-query";
import { getQueryClient, MutationConfig } from "@/lib/react-query";
import { postFollow, followQuery } from "@/api/feed/apis/follow-api";
import { FollowDTO, FeedList, InfiniteQueriesUpdater } from "@/api/feed/types";

type useFeedListFollowOptions = {
  userId: FollowDTO["userId"];
  queryName: keyof typeof followQuery;
  config?: MutationConfig<typeof postFollow>;
};

export const useFeedListFollow = ({
  userId,
  queryName,
  config,
}: useFeedListFollowOptions) => {
  const queryClient = getQueryClient();
  const { queryKey, queryFn } = followQuery[queryName](userId);

  const broadQueryKey = ["wordFeedList"];
  const feedListQueryKey = { queryKey: broadQueryKey };

  const newData: InfiniteQueriesUpdater<FeedList> = (previousEachData) => {
    const updatedPages = previousEachData?.pages.map((page) => {
      const updatedPosts = page.posts.map((post) => {
        if (post.userId !== userId) return post;
        return {
          ...post,
          subscribed: !post.subscribed,
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

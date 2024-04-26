import { useMutation, InfiniteData } from "@tanstack/react-query";
import { getQueryClient, MutationConfig } from "@/lib/react-query";
import { postFollow, followQuery } from "@/api/feed/apis/follow-api";
import { FollowDTO, FeedList, InfiniteQueriesUpdater } from "@/api/feed/types";

type useFeedListFollowOptions = {
  userId: FollowDTO["userId"];
  postId: number;
  queryName: keyof typeof followQuery;
  type?: "detail" | "profile";
  config?: MutationConfig<typeof postFollow>;
};

export const useFeedListFollow = ({
  userId,
  postId,
  queryName,
  type,
  config,
}: useFeedListFollowOptions) => {
  const queryClient = getQueryClient();
  const { queryKey, queryFn } = followQuery[queryName](userId);
  const broadQueryKey = ["wordFeedList"];
  const feedListQueryKey = { queryKey: broadQueryKey };

  const listNewData: InfiniteQueriesUpdater<FeedList> = (previousEachData) => {
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

      if (type === "detail") {
        const detailQueryKey = ["feedDetail", postId];
        const previousFeedDetail: any =
          queryClient.getQueryData(detailQueryKey);

        queryClient.setQueryData(detailQueryKey, {
          ...previousFeedDetail,
          subscribed: !previousFeedDetail.subscribed,
        });

        return { previousFeedDetail };
      }

      const previousFeedLists =
        queryClient.getQueriesData<InfiniteData<FeedList>>(feedListQueryKey);

      queryClient.setQueriesData<InfiniteData<FeedList>>(
        feedListQueryKey,
        listNewData
      );

      return { previousFeedLists };
    },

    onError: (error, newData, context) => {
      context?.previousFeedLists?.forEach((oldFeedList) => {
        const queryKey = oldFeedList[0];
        queryClient.setQueryData(queryKey, oldFeedList);
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

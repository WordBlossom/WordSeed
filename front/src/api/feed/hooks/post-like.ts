import { useMutation, InfiniteData } from "@tanstack/react-query";
import { getQueryClient, MutationConfig } from "@/lib/react-query";
import { postLike, likeQuery } from "@/api/feed/apis/like-api";
import {
  BookMarkAndLikeDTO,
  FeedDetail,
  FeedList,
  InfiniteQueriesUpdater,
} from "../types";
import useFeedTypeStateStore from "@/stores/feed-type";

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
  const { type, detail } = useFeedTypeStateStore();

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

  const listNewData: InfiniteQueriesUpdater<FeedList> = (previousEachData) => {
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

      if (detail) {
        const detailQueryKey = ["feedDetail", postId];
        const previousFeedDetail: any =
          queryClient.getQueryData(detailQueryKey);

        queryClient.setQueryData(detailQueryKey, {
          ...previousFeedDetail,
          liked: !previousFeedDetail.liked,
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

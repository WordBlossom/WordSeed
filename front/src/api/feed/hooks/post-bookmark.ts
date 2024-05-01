import { useMutation, InfiniteData } from "@tanstack/react-query";
import { getQueryClient, MutationConfig } from "@/lib/react-query";
import { postBookMark, bookMarkQuery } from "@/api/feed/apis/bookmark-api";
import {
  BookMarkAndLikeDTO,
  FeedDetail,
  FeedList,
  InfiniteQueriesUpdater,
} from "@/api/feed/types";
import useFeedTypeStateStore from "@/stores/feed-type";
import useFeedDetailStateStore from "@/stores/feed-detail";

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
  const { type, detail } = useFeedTypeStateStore();
  const { bookMarked, setBookMarked } = useFeedDetailStateStore();

  const feedListQueryKey = {
    queryKey:
      type === "word"
        ? [
            { [postType]: true },
            {
              wordId: String(wordId),
            },
          ]
        : [{ [postType]: true }],
  };

  const listNewData: InfiniteQueriesUpdater<FeedList> = (previousEachData) => {
    console.log(previousEachData);
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
      if (detail) {
        const detailQueryKey = ["feedDetail", postId];
        const previousFeedDetail: any =
          queryClient.getQueryData(detailQueryKey);

        queryClient.setQueryData(detailQueryKey, {
          ...previousFeedDetail,
          bookMarked: !previousFeedDetail.bookMarked,
        });

        return { previousFeedDetail };
      }

      await queryClient.cancelQueries({ queryKey });

      const previousFeedLists =
        queryClient.getQueriesData<InfiniteData<FeedList>>(feedListQueryKey);
      queryClient.setQueriesData<InfiniteData<FeedList>>(
        feedListQueryKey,
        listNewData
      );

      return { previousFeedLists };
    },
    onSuccess: async () => {
      if (type !== "word") {
        setBookMarked(!bookMarked);
      }
    },

    onError: (error, newData, context) => {
      context?.previousFeedLists?.forEach((oldFeedList) => {
        const queryKey = oldFeedList[0];
        queryClient.setQueryData(queryKey, oldFeedList[1]);
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

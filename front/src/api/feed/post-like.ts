import { useMutation, InfiniteData } from "@tanstack/react-query";
import { getQueryClient, MutationConfig } from "@/lib/react-query";
import { postLike, likeQuery } from "./like-api";
import useSearchFilterStateStore from "@/stores/search-filter";
import { DEFAULT_POST_TYPE } from ".";
import { BookMarkAndLikeDTO } from "./types";
import { FeedDetail, FeedList } from "./types";

type useListLikeOptions = {
  postId: BookMarkAndLikeDTO["postId"];
  wordId: FeedDetail["wordId"];
  queryName: keyof typeof likeQuery;
  config?: MutationConfig<typeof postLike>;
};

export const useListLike = ({
  postId,
  wordId,
  queryName,
  config,
}: useListLikeOptions) => {
  const queryClient = getQueryClient();
  const { queryKey, queryFn } = likeQuery[queryName](postId);
  const { selectedType, isLatest } = useSearchFilterStateStore();
  const postType = selectedType ? selectedType : DEFAULT_POST_TYPE;

  const feedListQueryKey = [
    "wordFeedList",
    {
      wordId: String(wordId),
      postType: postType,
      sort: isLatest ? "DATE_DSC" : "LIKE_DSC",
    },
  ];

  return useMutation({
    ...config,
    mutationFn: queryFn,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousFeedList = queryClient.getQueryData(
        feedListQueryKey
      ) as InfiniteData<FeedList>;

      const updatedPages = previousFeedList.pages.map((page) => {
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
        pageParams: previousFeedList.pageParams,
      } as InfiniteData<FeedList>;

      queryClient.setQueryData(feedListQueryKey, updatedFeedList);

      return { previousFeedList };
    },

    onError: (error, newData, context) => {
      queryClient.setQueryData(feedListQueryKey, context?.previousFeedList);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

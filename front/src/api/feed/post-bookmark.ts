import { useMutation, InfiniteData } from "@tanstack/react-query";
import { getQueryClient, MutationConfig } from "@/lib/react-query";
import { postBookMark, bookMarkQuery } from "./bookmark-api";
import useSearchFilterStateStore from "@/stores/search-filter";
import { BookMarkDTO, BookMark } from "./types";
import { FeedDetail, FeedList } from "./types";

type useListBookMarkOptions = {
  postId: BookMarkDTO["postId"];
  wordId: FeedDetail["wordId"];
  queryName: keyof typeof bookMarkQuery;
  config?: MutationConfig<typeof postBookMark>;
};

export const useListBookMark = ({
  postId,
  wordId,
  queryName,
  config,
}: useListBookMarkOptions) => {
  const queryClient = getQueryClient();
  const { queryKey, queryFn } = bookMarkQuery[queryName](postId);
  const { text, paint, video, music, isLatest } = useSearchFilterStateStore();
  let postType = [
    text ? "TEXT" : null,
    paint ? "PAINT" : null,
    video ? "VIDEO" : null,
    music ? "MUSIC" : null,
  ]
    .filter((type) => type)
    .join(",");

  const feedListQueryKey = [
    "FeedList",
    {
      postType: postType,
      sort: isLatest ? "DATE_DSC" : "LIKE_DSC",
      wordId: String(wordId),
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
            bookMarked: !post.bookMarked,
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

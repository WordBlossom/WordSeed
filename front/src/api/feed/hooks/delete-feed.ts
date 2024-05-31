import { useRouter, usePathname } from "next/navigation";
import { useMutation, InfiniteData } from "@tanstack/react-query";
import { getQueryClient, MutationConfig } from "@/lib/react-query";
import { deleteFeed } from "@/api/feed/apis/delete-feed-api";
import { FeedDetail, FeedList, InfiniteQueriesUpdater } from "@/api/feed/types";

type useDeleteFeedOptions = {
  postId: FeedDetail["postId"];
  wordId: FeedDetail["wordId"];
  postType: FeedDetail["postType"];
  config?: MutationConfig<typeof deleteFeed>;
};

export const useDeleteFeed = ({
  postId,
  wordId,
  postType,
}: useDeleteFeedOptions) => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = getQueryClient();
  const wordFeedListQueryKey = {
    queryKey: [
      { [postType]: true },
      { wordId: String(wordId) },
      "wordFeedList",
    ],
  };
  const myFeedListQueryKey = {
    queryKey: [{ [postType]: true }, , "myFeedList"],
  };

  const listNewData: InfiniteQueriesUpdater<FeedList> = (previousEachData) => {
    const updatedPages = previousEachData?.pages.map((page) => {
      const updatedPosts = page.posts.filter((post) => post.postId !== postId);
      return { ...page, posts: updatedPosts };
    });

    const updatedFeedList = {
      pages: updatedPages,
      pageParams: previousEachData?.pageParams,
    } as InfiniteData<FeedList>;
    return updatedFeedList;
  };

  return useMutation({
    mutationFn: () => deleteFeed({ postId }),
    onMutate: async () => {
      await Promise.all([
        queryClient.cancelQueries(wordFeedListQueryKey),
        queryClient.cancelQueries(myFeedListQueryKey),
      ]);

      const previousWordFeedLists =
        queryClient.getQueriesData<InfiniteData<FeedList>>(
          wordFeedListQueryKey
        );
      const previousMyFeedLists =
        queryClient.getQueriesData<InfiniteData<FeedList>>(myFeedListQueryKey);

      queryClient.setQueriesData<InfiniteData<FeedList>>(
        wordFeedListQueryKey,
        listNewData
      );
      queryClient.setQueriesData<InfiniteData<FeedList>>(
        myFeedListQueryKey,
        listNewData
      );

      return { previousWordFeedLists, previousMyFeedLists };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(wordFeedListQueryKey);
      queryClient.invalidateQueries(myFeedListQueryKey);
    },
    onError: (error, newData, context) => {
      console.log(context);
    },
  });
};

import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import {
  usePrefetchFeedList,
  DEFAULT_POST_TYPE,
  DEFAULT_SORT,
} from "@/api/feed/";
import { MainFeedListDTO } from "@/api/feed/types";

type FeedLayoutProps = {
  children: React.ReactNode;
  params: { word_id: number };
};

export default async function FeedLayout({
  children,
  params,
}: FeedLayoutProps) {
  const wordId = params.word_id;

  const queryClient = new QueryClient();
  const defaultParams: MainFeedListDTO = {
    postType: DEFAULT_POST_TYPE,
    sort: DEFAULT_SORT,
  };
  if (wordId) {
    defaultParams["wordId"] = wordId;
  }

  const dehydratedQueryClient = await usePrefetchFeedList({
    queryClient: queryClient,
    params: defaultParams,
    type: wordId ? "word" : "follow",
  });

  return (
    <HydrationBoundary state={dehydratedQueryClient}>
      {children}
    </HydrationBoundary>
  );
}

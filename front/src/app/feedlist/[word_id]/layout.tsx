import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import {
  usePrefetchFeedList,
  DEFAULT_POST_TYPE,
  DEFAULT_SORT,
} from "@/api/feed/";
import { FeedListDTO } from "@/api/feed/types";

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
  const defaultParams: FeedListDTO = {
    wordId: wordId,
    postType: DEFAULT_POST_TYPE,
    sort: DEFAULT_SORT,
  };

  const dehydratedQueryClient = await usePrefetchFeedList({
    queryClient: queryClient,
    params: defaultParams,
  });

  return (
    <HydrationBoundary state={dehydratedQueryClient}>
      {children}
    </HydrationBoundary>
  );
}

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getFeedDetail } from "@/api/feed/apis/get-feed-api";

type FeedDetailLayoutProps = {
  children: React.ReactNode;
  params: { feed_id: number };
};

export default async function FeedDetailLayout({
  children,
  params,
}: FeedDetailLayoutProps) {
  const feedId = Number(params.feed_id);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["feedDetail", feedId],
    queryFn: () => getFeedDetail({ postId: feedId }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}

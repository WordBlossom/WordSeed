import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getFeedDetail } from "@/api/feed/";

type FeedLayoutProps = {
  children: React.ReactNode;
  params: { feed_id: number };
};

export default async function FeedLayout({
  children,
  params,
}: FeedLayoutProps) {
  const feedId = params.feed_id;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["feedDetail", feedId],
    queryFn: () => getFeedDetail(feedId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}

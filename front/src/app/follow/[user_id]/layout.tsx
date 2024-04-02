import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { usePrefetchFollowAuthorList } from "@/api/author";
import { FollowType } from "@/api/author/types";

type FollowLayoutProps = {
  children: React.ReactNode;
  params: { user_id: number };
};

export default async function FollowLayout({
  children,
  params,
}: FollowLayoutProps) {
  const queryClient = new QueryClient();

  const myId = 4;
  const userId = Number(params.user_id);

  const followParams = {
    userId,
    type: FollowType.Send,
  };

  const props = {
    queryClient,
    params: followParams,
  };

  const dehydratedQueryClient = await usePrefetchFollowAuthorList(props);

  return (
    <HydrationBoundary state={dehydratedQueryClient}>
      {children}
    </HydrationBoundary>
  );
}

import { userInfoQuery } from "@/api/user";
import { usePrefetchFeedList } from "@/api/feed/";
import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { UserFeedListDTO, FeedTypeEnum } from "@/api/feed/types";
import { myParams } from "@/constants/feed-default";

type ProfileLayoutProps = {
  children: React.ReactNode;
  params: { user_id: number };
};

export default async function ProfileLayout({
  children,
  params,
}: ProfileLayoutProps) {
  const queryClient = new QueryClient();

  const myId = 4;
  const userId = Number(params.user_id);
  const isMe = myId === userId;

  const userParams: UserFeedListDTO = {
    ...myParams,
    userId,
  };

  const props = {
    queryClient: queryClient,
    params: isMe ? myParams : userParams,
    type: isMe ? FeedTypeEnum.My : FeedTypeEnum.User,
  };

  await queryClient.prefetchQuery(userInfoQuery.userInfo(userId));

  const dehydratedQueryClient = await usePrefetchFeedList(props);

  return (
    <HydrationBoundary state={dehydratedQueryClient}>
      {children}
    </HydrationBoundary>
  );
}

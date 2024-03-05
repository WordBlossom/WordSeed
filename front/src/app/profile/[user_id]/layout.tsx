import { userInfoQuery } from "@/api/user/get-user-info";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { user_id: number };
}) {
  const userId = params.user_id;
  const { queryKey, queryFn } = userInfoQuery.userInfo(userId);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({ queryKey, queryFn });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}

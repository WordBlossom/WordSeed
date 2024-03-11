import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { userInfoQuery } from "@/api/user";

type UserInfoLayoutProps = {
  children: React.ReactNode;
};

export default async function UserInfoLayout({
  children,
}: UserInfoLayoutProps) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(userInfoQuery.myInfo());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}

import { getUserInfo2 } from "@/api/user/get-user-info";
import { Hydrate, getDehydratedQuery } from "@/utils/react-query";

export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const query = await getDehydratedQuery({
    queryKey: ["userinfo"],
    queryFn: getUserInfo2,
    // queryFn: getUserInfo2({ userId: 9 }),
  });

  return (
    <Hydrate state={{ queries: [query] }}>
      {children}
      {/* {JSON.stringify(query.state.data)} */}
    </Hydrate>
  );
}

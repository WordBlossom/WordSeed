import { HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { usePrefetchWordseedList } from "@/api/wordseed";

type WordListLayoutProps = {
  children: React.ReactNode;
};

export default async function WordlistLayout({
  children,
}: WordListLayoutProps) {
  const queryClient = new QueryClient();

  const props = {
    queryClient,
    params: {
      query: "",
    },
  };

  const dehydratedQueryClient = await usePrefetchWordseedList(props);

  return (
    <HydrationBoundary state={dehydratedQueryClient}>
      {children}
    </HydrationBoundary>
  );
}

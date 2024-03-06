import { todaysDate } from "@/utils/getDateUtils";
import WordseedMain from "@/components/wordseed-main/wordseed-main";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getWordseed } from "@/api/wordseed";

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["todayWordseed", todaysDate],
    queryFn: () => getWordseed(todaysDate),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WordseedMain date={todaysDate} />;
    </HydrationBoundary>
  );
}

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getWordseed } from "@/api/wordseed";
import WordseedMain from "@/components/wordseed-main/wordseed-main";

type WordseedParams = {
  params: { date: string };
};

export default async function Wordseed({ params }: WordseedParams) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["wordseed", params.date],
    queryFn: () => getWordseed(params.date),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WordseedMain date={params.date} />;
    </HydrationBoundary>
  );
}

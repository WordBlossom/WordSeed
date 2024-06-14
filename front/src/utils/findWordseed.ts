import { getQueryClient } from "@/lib/react-query";
import { Wordseed } from "@/api/wordseed/types";

export const findWordseed = (wordId: number) => {
  const queryClient = getQueryClient();
  const wordseeds = queryClient
    .getQueriesData({
      queryKey: ["wordseed"],
    })[0]
    .slice(1) as Wordseed[];
  const wordseed = wordseeds.filter((data) => data.wordId === wordId)[0].word;
  return wordseed;
};

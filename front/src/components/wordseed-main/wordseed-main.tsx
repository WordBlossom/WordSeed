"use client";

import { useQuery } from "@tanstack/react-query";
import WordseedContainer from "./wordseed-container";
import WordseedContent from "./wordseed-content";
import WordseedButtons from "./wordseed-buttons";
import { getWordseed } from "@/api/wordseed";

type WordseedProps = {
  date: string;
};

export default function WordseedMain({ date }: WordseedProps) {
  const { data: word } = useQuery({
    queryKey: ["wordseed", date],
    queryFn: () => getWordseed(date),
  });

  return (
    <WordseedContainer>
      <WordseedContent date={date} wordseed={word?.word} />
      <WordseedButtons wordId={word?.wordId} />
    </WordseedContainer>
  );
}

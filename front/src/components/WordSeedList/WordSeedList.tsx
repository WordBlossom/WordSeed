"use client";

import { useInView } from "react-intersection-observer";
import Wordseed from "@/components/WordSeed/WordSeed";
import { Wordseed as Wordseedtype } from "@/api/wordseed/types";
import { WordseedListFetchNextPage } from "./types";
import styles from "./WordSeedList.module.scss";

type WordSeedListProps = {
  data: Wordseedtype[] | undefined;
  fetchNextPage: WordseedListFetchNextPage;
};

export default function WordSeedList({
  data,
  fetchNextPage,
}: WordSeedListProps) {
  const [ref] = useInView({
    onChange: (inView) => {
      if (inView) fetchNextPage();
    },
  });

  return (
    <div className={styles.container}>
      {data?.map((wordseed, idx) => (
        <div
          key={wordseed.createdAt}
          ref={idx === data.length - 5 ? ref : undefined}
        >
          <Wordseed date={wordseed.createdAt} wordseed={wordseed.word} />
        </div>
      ))}
    </div>
  );
}

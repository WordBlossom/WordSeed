"use client";

import { useWordseedList } from "@/api/wordseed";
import { WordSeedList } from "@/components";
import styles from "./wordlist.module.scss";

export default function Wordlist() {
  const { data, fetchNextPage } = useWordseedList({
    params: {
      query: "",
    },
  });

  return (
    <div className={styles.container}>
      {data && <WordSeedList data={data.pages} fetchNextPage={fetchNextPage} />}
    </div>
  );
}

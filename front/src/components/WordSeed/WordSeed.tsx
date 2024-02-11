"use client";

import styles from "./WordSeed.module.scss";
import { useRouter } from "next/navigation";

type WordSeedProps = {
  date: string;
  wordSeed: string;
};
export default function WordSeed({ date, wordSeed }: WordSeedProps) {
  const router = useRouter();
  const wordSeedLink = `/wordseed/${wordSeed}`;

  return (
    <div
      onClick={() => {
        router.push(wordSeedLink);
      }}
      className={styles.container}
    >
      <p className={styles.date}>{date}</p>
      <p className={styles.wordSeed}>{wordSeed}</p>
    </div>
  );
}

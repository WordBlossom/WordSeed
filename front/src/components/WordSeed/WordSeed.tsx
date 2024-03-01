"use client";

import Link from "next/link";
import styles from "./WordSeed.module.scss";

type WordseedProps = {
  date: string;
  wordseed: string;
};
export default function WordSeed({ date, wordseed }: WordseedProps) {
  return (
    <Link href={`/wordseed/${wordseed}`} className={styles.container}>
      <p className={styles.date}>{date}</p>
      <p className={styles.wordseed}>{wordseed}</p>
    </Link>
  );
}

import styles from "./WordSeed.module.scss";

type WordSeedProps = {
  date: string;
  wordSeed: string;
};
export default function WordSeed({ date, wordSeed }: WordSeedProps) {
  return (
    <div className={styles.container}>
      <p className={styles.date}>{date}</p>
      <p className={styles.wordSeed}>{wordSeed}</p>
    </div>
  );
}

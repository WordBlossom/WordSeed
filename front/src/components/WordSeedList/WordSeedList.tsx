import { WordSeed } from "..";
import styles from "./WordSeedList.module.scss";

type WordSeedProps = {
  date: string;
  wordSeed: string;
};

type WordSeedListProps = {
  datas: WordSeedProps[];
};

export default function WordSeedList({ datas }: WordSeedListProps) {
  return (
    <div className={styles.container}>
      {datas.map((data) => (
        <WordSeed key={data.date} date={data.date} wordSeed={data.wordSeed} />
      ))}
    </div>
  );
}

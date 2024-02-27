import { todaysDate } from "@/utils/getDateUtils";
import style from "./wordseed.module.scss";

type WordseedContentProps = {
  date: string;
};

export default function WordseedContent({ date }: WordseedContentProps) {
  // date로 말씨 호출
  return (
    <div className={style["wordseed-content"]}>
      <p className={style["wordseed-guide"]}>
        {date === todaysDate ? "오늘의 말씨" : "그날의 말씨"}
      </p>
      <p className={style["wordseed"]}>무지개</p>
    </div>
  );
}

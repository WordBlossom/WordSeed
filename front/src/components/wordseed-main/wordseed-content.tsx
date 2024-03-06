import { todaysDate } from "@/utils/getDateUtils";
import { Wordseed } from "@/api/wordseed/types";
import style from "./wordseed.module.scss";

type WordseedContentProps = {
  date: string;
  wordseed: string | undefined;
};

export default function WordseedContent({
  date,
  wordseed,
}: WordseedContentProps) {
  return (
    <div className={style["wordseed-content"]}>
      <p className={style["wordseed-guide"]}>
        {date === todaysDate ? "오늘의 말씨" : "그날의 말씨"}
      </p>
      <p className={style["wordseed"]}>{wordseed}</p>
    </div>
  );
}

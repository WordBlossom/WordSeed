import { Wordseed } from "@/api/wordseed/types";
import { Icon } from "@/components";
import style from "./wordseed.module.scss";
import Link from "next/link";

type WordseedButtonsProps = {
  wordId: Wordseed["wordId"] | undefined;
};

export default function WordseedButtons({ wordId }: WordseedButtonsProps) {
  return (
    <div className={style["wordseed-buttons"]}>
      <Link href={`/feedlist/${wordId}`}>
        <Icon iconName="sun" />
      </Link>
      <Link href={`/create/${wordId}`}>
        <Icon iconName="water" />
      </Link>
    </div>
  );
}

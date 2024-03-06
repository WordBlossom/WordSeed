import { Wordseed } from "@/api/wordseed/types";
import { Icon } from "@/components";
import style from "./wordseed.module.scss";
import Link from "next/link";

type WordseedButtonsProps = {
  date: string;
  wordseed: Wordseed | undefined;
};

export default function WordseedButtons({
  date,
  wordseed,
}: WordseedButtonsProps) {
  return (
    <div className={style["wordseed-buttons"]}>
      <Link href={`/feedlist/${wordseed?.word}`}>
        <Icon iconName="sun" />
      </Link>
      <Link href={`/create/${date}`}>
        <Icon iconName="water" />
      </Link>
    </div>
  );
}

import { Icon } from "@/components";
import style from "./wordseed.module.scss";
import Link from "next/link";

type WordseedButtonsProps = {
  date: string;
  wordseed: string;
};

export default function WordseedButtons({
  date,
  wordseed,
}: WordseedButtonsProps) {
  return (
    <div className={style["wordseed-buttons"]}>
      <Link href={`/feedlist/${wordseed}`}>
        <Icon iconName="sun" />
      </Link>
      <Link href={`/create/${date}`}>
        <Icon iconName="water" />
      </Link>
    </div>
  );
}

import { Icon } from "@/components";

import style from "./wordseed.module.scss";
import Link from "next/link";

type WordseedButtonsProps = {
  date: string;
};

export default function WordseedButtons({ date }: WordseedButtonsProps) {
  return (
    <div className={style["wordseed-buttons"]}>
      <Link href={`/feedlist/${date}`}>
        <Icon iconName="sun" />
      </Link>
      <Link href={`/create/${date}`}>
        <Icon iconName="water" />
      </Link>
    </div>
  );
}

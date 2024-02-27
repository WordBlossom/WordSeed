import style from "./wordseed.module.scss";

type WordseedContainerProps = {
  children: React.ReactNode;
};

export default function WordseedContainer({
  children,
}: WordseedContainerProps) {
  return <div className={style["wordseed-container"]}>{children}</div>;
}

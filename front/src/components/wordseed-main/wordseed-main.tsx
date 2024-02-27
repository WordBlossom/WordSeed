import WordseedContainer from "./wordseed-container";
import WordseedContent from "./wordseed-content";
import WordseedButtons from "./wordseed-buttons";

type WordseedProps = {
  date: string;
};

export default function WordseedMain({ date }: WordseedProps) {
  // date로 word 호출
  const word = "무지개";
  return (
    <WordseedContainer>
      <WordseedContent date={date} wordseed={word} />
      <WordseedButtons date={date} wordseed={word} />
    </WordseedContainer>
  );
}

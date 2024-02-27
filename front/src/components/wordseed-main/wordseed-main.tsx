import WordseedContainer from "./wordseed-container";
import WordseedContent from "./wordseed-content";
import WordseedButtons from "./wordseed-buttons";

type WordseedProps = {
  date: string;
};

export default function WordseedMain({ date }: WordseedProps) {
  return (
    <WordseedContainer>
      <WordseedContent date={date} />
      <WordseedButtons date={date} />
    </WordseedContainer>
  );
}

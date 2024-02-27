import WordseedMain from "@/components/wordseed-main/wordseed-main";

type WordseedParams = {
  params: { date: string };
};

export default function Wordseed({ params }: WordseedParams) {
  return <WordseedMain date={params.date} />;
}

import { WordSeedList } from "@/components";

const datas: {
  date: string;
  wordSeed: string;
}[] = [
  {
    date: "2024년 2월 9일",
    wordSeed: "한 걸음",
  },
  {
    date: "2024년 2월 9일",
    wordSeed: "한 걸음",
  },
  {
    date: "2024년 2월 9일",
    wordSeed: "한 걸음",
  },
  {
    date: "2024년 2월 9일",
    wordSeed: "한 걸음",
  },
  {
    date: "2024년 2월 9일",
    wordSeed: "한 걸음",
  },
  {
    date: "2024년 2월 9일",
    wordSeed: "한 걸음",
  },
  {
    date: "2024년 2월 9일",
    wordSeed: "한 걸음",
  },
  {
    date: "2024년 2월 9일",
    wordSeed: "한 걸음",
  },
  {
    date: "2024년 2월 9일",
    wordSeed: "한 걸음",
  },
  {
    date: "2024년 2월 9일",
    wordSeed: "한 걸음",
  },
  {
    date: "2024년 2월 9일",
    wordSeed: "한 걸음",
  },
  {
    date: "2024년 2월 9일",
    wordSeed: "한 걸음",
  },
];

export default function Wordlist() {
  return (
    <>
      <h1>Wordlist</h1>
      <WordSeedList datas={datas} />
    </>
  );
}

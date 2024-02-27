import { todaysDate } from "@/utils/getDateUtils";

export default function Wordseed({ params }: { params: { date: string } }) {
  const date = params.date ? params.date : todaysDate;

  return (
    <>
      <h1>Wordseed</h1>
      <h2>Wordseed : {date}</h2>
    </>
  );
}

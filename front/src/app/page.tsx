import { todaysDate } from "@/utils/getDateUtils";
import WordseedMain from "@/components/wordseed-main/wordseed-main";

export default function Home() {
  return <WordseedMain date={todaysDate} />;
}

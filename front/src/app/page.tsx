"use client";

import { useEffect } from "react";
import { todaysDate } from "@/utils/getDateUtils";
import WordseedMain from "@/components/wordseed-main/wordseed-main";

import { axios } from "@/lib/axios";

export default function Home() {
  const getWordseed = () => {
    axios.get("/word?date=2024-02-10").then((res) => console.log(res));
  };

  useEffect(() => {
    getWordseed();
  }, []);

  return <WordseedMain date={todaysDate} />;
}

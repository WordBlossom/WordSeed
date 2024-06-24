"use client"

import { todaysDate } from "@/utils/getDateUtils";
import { Wordseed } from "@/api/wordseed/types";
import style from "./wordseed.module.scss";
import axios, { Axios } from "axios";
import { API_URL } from "@/config";



type WordseedContentProps = {
  date: string;
  wordseed: string | undefined;
};

export default function WordseedContent({
  date,
  wordseed,
}: WordseedContentProps) {
  const params = { code: "4%2F0ATx3LY6Dw7hs3fXClUnzpa_8t7bMgpqP4-Qj5U_jkxNcH3MWySZ5QZNBWykIvpKs1RBOPA" }


  const loginHandler = async () => {
    const response = await axios.get(`${API_URL}/account/login/google/callback`, { params })

    const refreshToken = response.headers["refresh"]
    const token = response.headers["authorization"]

    console.log(response.headers)
  }



  return (
    <div className={style["wordseed-content"]}>
      <p className={style["wordseed-guide"]}>
        {date === todaysDate ? "오늘의 말씨" : "그날의 말씨"}
      </p>
      <p className={style["wordseed"]}>{wordseed}</p>
      <button onClick={loginHandler}>로그인</button>
    </div>
  );
}

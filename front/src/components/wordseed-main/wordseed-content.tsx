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
  const params = { code: "4%2F0ATx3LY6QK0fUUDal-gSI4IIGA_PJ1FIDhwbxWaVmuW6voHxomWag4M7FfxAwkjBeU7OF-A" }


  const loginHandler = async () => {
    const response = await axios.get(`${API_URL}/account/login/google/callback`, { params })

    const refreshToken = await response.headers["refresh"]
    const accessToken = await response.headers["authorization"]

    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
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

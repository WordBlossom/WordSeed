"use client";

import useSearchPageStateStore from "@/stores/search-page";
import { Button } from "@/components";
import style from "./search.module.scss";

export default function SearchButtons() {
  const { isWordseed, setWordseed, setAuthor } = useSearchPageStateStore();

  return (
    <div className={style["button-wrapper"]}>
      <Button
        type="wide"
        content={"말씨"}
        isActive={isWordseed}
        onClick={setWordseed}
      />
      <Button
        type="wide"
        content={"작가"}
        isActive={!isWordseed}
        onClick={setAuthor}
      />
    </div>
  );
}

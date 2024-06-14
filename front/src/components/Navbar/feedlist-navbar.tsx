"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { findWordseed } from "@/utils/findWordseed";
import IncludeMenu from "./include-menu/include-menu";
import FilterButton from "../Button/filter-button";
import CreateFeedButton from "../Button/create-feed-button";
import Filter from "../filter/filter";
import styles from "./navbar.module.scss";

export default function FeedListNavbar() {
  const [isHidden, setIsHidden] = useState(true);
  const params = useParams();
  const wordId = Number(params.word_id);
  const wordseed = findWordseed(wordId);
  return (
    <IncludeMenu>
      <div className={styles["right-icon-container"]}>
        <FilterButton isHidden={isHidden} setIsHidden={setIsHidden} />
        <span className={styles["wordseed"]}>{wordseed}</span>
        <CreateFeedButton />
      </div>
      {!isHidden && (
        <div className={styles["filter-container"]}>
          <Filter />
        </div>
      )}
    </IncludeMenu>
  );
}

"use client";

import IncludeMenu from "./include-menu/include-menu";
import FilterButton from "../Button/filter-button";
import CreateFeedButton from "../Button/create-feed-button";
import Filter from "../filter/filter";
import styles from "./navbar.module.scss";
import { useState } from "react";

export default function FeedListNavbar() {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <IncludeMenu>
      <div className={styles["right-icon-container"]}>
        <FilterButton isHidden={isHidden} setIsHidden={setIsHidden} />
        <CreateFeedButton />
      </div>
      <div
        className={`${styles["filter-container"]} ${
          isHidden ? styles["hidden"] : ""
        }`}
      >
        <Filter />
      </div>
    </IncludeMenu>
  );
}

"use client";

import IncludeMenu from "./include-menu/include-menu";
import FilterButton from "../Button/filter-button";
import CreateFeedButton from "../Button/create-feed-button";
import styles from "./navbar.module.scss";

export default function FeedListNavbar() {
  return (
    <IncludeMenu>
      <div className={styles["right-icon-container"]}>
        <FilterButton />
        <CreateFeedButton />
      </div>
    </IncludeMenu>
  );
}

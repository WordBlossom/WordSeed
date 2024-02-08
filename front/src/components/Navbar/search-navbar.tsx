"use client";

import BackButton from "../Button/back-button";
import styles from "./navbar.module.scss";
import SearchInput from "./search-input/search-input";
export default function SearchNavbar() {
  return (
    <div className={styles.navbar}>
      <BackButton />
      <SearchInput />
      <div className={styles.blank}></div>
    </div>
  );
}

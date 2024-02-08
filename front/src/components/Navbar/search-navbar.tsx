"use client";

import BackButton from "../Button/back-button";
import styles from "./navbar.module.scss";

export default function SearchNavbar() {
  return (
    <div className={styles.navbar}>
      <BackButton />
      검색창
      <div className={styles.blank}></div>
    </div>
  );
}

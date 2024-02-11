"use client";

import BackButton from "../Button/back-button";
import styles from "./navbar.module.scss";
export default function WordListNavbar() {
  return (
    <div className={styles.navbar}>
      <BackButton />
      <div className={styles.blank}></div>
    </div>
  );
}

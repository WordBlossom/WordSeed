"use client";

import IncludeMenu from "./include-menu/include-menu";
import styles from "./navbar.module.scss";

export default function WordseedNavbar() {
  return (
    <IncludeMenu>
      <p className={styles.date}>오늘의 날짜</p>
    </IncludeMenu>
  );
}

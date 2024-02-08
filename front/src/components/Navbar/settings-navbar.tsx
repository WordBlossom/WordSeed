"use client";

import BackButton from "../Button/back-button";
import styles from "./navbar.module.scss";
export default function SettingsNavbar() {
  return (
    <div className={styles.navbar}>
      <BackButton />
      <header className={styles.title}>설정</header>
      <div className={styles.blank}></div>
    </div>
  );
}

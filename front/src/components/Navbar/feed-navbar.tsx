"use client";
import BackButton from "../Button/back-button";
import styles from "./navbar.module.scss";
export default function FeedNavbar() {
  return (
    <div className={styles.navbar}>
      <BackButton />
    </div>
  );
}

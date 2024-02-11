"use client";

import Button from "../Button/Button";
import BackButton from "../Button/back-button";
import styles from "./navbar.module.scss";
export default function AlramNavbar() {
  const onClick = (e: React.MouseEvent) => {
    // 알람 데이터 삭제
  };
  return (
    <div className={styles.navbar}>
      <BackButton />
      <header className={styles.title}>알람</header>
      <Button content={"전체 삭제"} onClick={onClick} />
    </div>
  );
}

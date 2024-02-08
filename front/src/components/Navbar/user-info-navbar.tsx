"use client";

import Button from "../Button/Button";
import BackButton from "../Button/back-button";
import styles from "./navbar.module.scss";
export default function UserInfoNavbar() {
  const onClick = (e: React.MouseEvent) => {
    // 수정된 개인정보 post 요청
  };
  return (
    <div className={styles.navbar}>
      <BackButton />
      <header className={styles.title}>개인정보수정</header>
      <Button content={"완료"} onClick={onClick} />
    </div>
  );
}

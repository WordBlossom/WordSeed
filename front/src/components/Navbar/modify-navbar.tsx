"use client";

import Button from "../Button/Button";
import styles from "./navbar.module.scss";
export default function ModifyNavbar() {
  const handleCloseButtonClick = (e: React.MouseEvent) => {
    // 뒤로가기
  };
  const handleSubmitButtonClick = (e: React.MouseEvent) => {
    // 작성된 내용 post 요청
  };
  return (
    <div className={styles.navbar}>
      <Button content={"닫기"} onClick={handleCloseButtonClick} />
      <header className={styles.wordseed}>해당 말씨</header>
      <Button content={"완료"} onClick={handleSubmitButtonClick} />
    </div>
  );
}

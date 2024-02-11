"use client";
import CreateCategory from "./create-category/create-category";
import Button from "../Button/Button";
import styles from "./navbar.module.scss";
import { useState } from "react";

export default function CreateNavbar() {
  const [selectedCategory, setSelectedCategory] = useState("글");
  // selectedCategory 형식으로 게시글 업로드 요청

  const handleCloseButtonClick = (e: React.MouseEvent) => {
    // 뒤로가기
  };
  const handleSubmitButtonClick = (e: React.MouseEvent) => {
    // 작성된 내용 post 요청
  };
  return (
    <div>
      <div className={styles.navbar}>
        <Button content={"닫기"} onClick={handleCloseButtonClick} />
        <header className={styles.wordseed}>해당 말씨</header>
        <Button content={"완료"} onClick={handleSubmitButtonClick} />
      </div>
      <CreateCategory
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
}

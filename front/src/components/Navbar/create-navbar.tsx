"use client";

import Button from "../Button/Button";
import styles from "./navbar.module.scss";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function CreateNavbar() {
  const router = useRouter();

  const params = useParams();
  const wordseed = decodeURIComponent(params.wordseed as string);
  // selectedCategory 형식으로 게시글 업로드 요청

  const handleSubmitButtonClick = (e: React.MouseEvent) => {
    // 작성된 내용 post 요청
  };

  return (
    <div>
      <div className={styles.navbar}>
        <Button content={"닫기"} onClick={() => router.back()} />
        <header className={styles.wordseed}>{wordseed}</header>
        <Button content={"완료"} onClick={handleSubmitButtonClick} />
      </div>
    </div>
  );
}

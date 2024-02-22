"use client";

import createContentStore from "@/stores/create-content";
import Button from "../Button/Button";
import styles from "./navbar.module.scss";
import { useParams, useRouter } from "next/navigation";

export default function CreateNavbar() {
  const router = useRouter();
  const useContentStore = createContentStore();
  const params = useParams();
  const wordseed = decodeURIComponent(params.wordseed as string);
  // selectedCategory 형식으로 게시글 업로드 요청

  const handleSubmitButtonClick = (e: React.MouseEvent) => {
    // 작성된 내용 post 요청

    // 스토어에 저장된 내용 초기화
    useContentStore.cleanCreateContentState();
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

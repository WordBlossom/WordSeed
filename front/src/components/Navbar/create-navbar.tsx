"use client";

import { useParams, useRouter } from "next/navigation";
import { usePostFeed } from "@/api/feed/hooks/post-feed";
import createContentStore from "@/stores/create-content";
import { findWordseed } from "@/utils/findWordseed";
import Button from "../Button/Button";
import styles from "./navbar.module.scss";

export default function CreateNavbar() {
  const router = useRouter();

  // 현재 말씨 찾기
  // wordseed query 중 wordId와 같은 말씨를 찾음
  const wordId = Number(useParams().word_id);
  const wordseed = findWordseed(wordId);

  // selectedCategory 형식으로 게시글 업로드 요청
  const {
    type: postType,
    textAlign: postAlign,
    textContent: content,
    postVisibility,
    file,
    cleanCreateContentState,
  } = createContentStore();

  // media 작품 임시 url 설정
  let url: string;
  if (postType === "PAINT") url = "https://picsum.photos/800/400";
  if (postType === "VIDEO")
    url = "https://cdn.pixabay.com/video/2024/03/31/206294_large.mp4";
  if (postType === "MUSIC")
    url = "https://sample-videos.com/audio/mp3/crowd-cheering.mp3";

  const postFeed = usePostFeed({ wordId });

  const handleCloseButtonClick = () => {
    cleanCreateContentState();
    router.back();
  };

  const handleSubmitButtonClick = () => {
    if (postFeed.isPending) return;

    if (postType === "TEXT" && !content) {
      alert("내용을 작성해주세요");
      return;
    }

    // 작성된 내용 post 요청
    postFeed.mutate({
      wordId,
      postType,
      postAlign,
      content,
      postVisibility,
      url,
    });
  };

  return (
    <div>
      <div className={styles.navbar}>
        <Button content={"닫기"} onClick={handleCloseButtonClick} />
        <header className={styles.wordseed}>{wordseed}</header>
        <Button content={"완료"} onClick={handleSubmitButtonClick} />
      </div>
    </div>
  );
}

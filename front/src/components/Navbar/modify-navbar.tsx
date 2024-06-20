"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { usePutFeed } from "@/api/feed/hooks/put-feed";
import createContentStore from "@/stores/create-content";
import Button from "../Button/Button";
import styles from "./navbar.module.scss";

export default function CreateNavbar() {
  const router = useRouter();
  const postId = Number(useParams().feed_id);
  const beforeRoute = useSearchParams().get("from") as string;

  // selectedCategory 형식으로 게시글 수정 요청
  const {
    wordseed,
    wordId,
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

  const putFeed = usePutFeed({ wordId: wordId as number, postType });

  const handleCloseButtonClick = () => {
    cleanCreateContentState();
    router.replace(beforeRoute);
  };

  const handleSubmitButtonClick = () => {
    if (putFeed.isPending) return;
    if (postType === "TEXT" && !content) {
      alert("내용을 작성해주세요");
      return;
    }
    // 작성된 내용 put 요청
    putFeed.mutate({
      postId,
      content,
      url,
      postType,
      postAlign,
      postVisibility,
    });
  };

  return (
    <div className={styles.navbar}>
      <Button content={"닫기"} onClick={handleCloseButtonClick} />
      <header className={styles.wordseed}>{wordseed}</header>
      <Button content={"수정"} onClick={handleSubmitButtonClick} />
    </div>
  );
}

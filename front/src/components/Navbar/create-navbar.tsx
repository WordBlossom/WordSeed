"use client";

import { useParams, useRouter } from "next/navigation";
import { getQueryClient } from "@/lib/react-query";
import { usePostFeed } from "@/api/feed/hooks/post-feed";
import createContentStore from "@/stores/create-content";
import Button from "../Button/Button";
import styles from "./navbar.module.scss";
import { Wordseed } from "@/api/wordseed/types";

export default function CreateNavbar() {
  const router = useRouter();

  // 현재 말씨 찾기
  // wordseed query 중 wordId와 같은 말씨를 찾음
  const wordId = Number(useParams().word_id);
  const queryClient = getQueryClient();
  const wordseeds = queryClient
    .getQueriesData({
      queryKey: ["wordseed"],
    })[0]
    .slice(1) as Wordseed[];
  const wordseed = wordseeds.filter((data) => data.wordId === wordId)[0].word;

  // selectedCategory 형식으로 게시글 업로드 요청
  const {
    type: postType,
    textAlign: postAlign,
    textContent: content,
    postVisibility,
    file,
  } = createContentStore();

  // media 작품 임시 url 설정
  let url: string;
  if (postType === "PAINT") url = "https://picsum.photos/200/300";
  if (postType === "VIDEO")
    url =
      "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_5mb.mp4";
  if (postType === "MUSIC")
    url = "https://sample-videos.com/audio/mp3/crowd-cheering.mp3";

  const postFeed = usePostFeed({ wordId });

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
        <Button content={"닫기"} onClick={() => router.back()} />
        <header className={styles.wordseed}>{wordseed}</header>
        <Button content={"완료"} onClick={handleSubmitButtonClick} />
      </div>
    </div>
  );
}

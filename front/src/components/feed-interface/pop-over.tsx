"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDeleteFeed } from "@/api/feed/hooks/delete-feed";
import { FeedDetail } from "@/api/feed/types";
import createContentStore from "@/stores/create-content";
import Button from "@/components/Button/Button";
import styles from "./feed-interface.module.scss";

type PopoverProps = {
  showPopover: boolean;
  wordseed: FeedDetail["word"];
  postAlign: FeedDetail["postAlign"];
  content: FeedDetail["content"];
  url: FeedDetail["url"];
  postId: FeedDetail["postId"];
  wordId: FeedDetail["wordId"];
  postType: FeedDetail["postType"];
  userId: FeedDetail["userId"];
};

export default function Popover({
  showPopover,
  wordseed,
  postAlign,
  content,
  url,
  wordId,
  postId,
  postType,
  userId,
}: PopoverProps) {
  const pathName = usePathname();

  const {
    setWordseed,
    setWordId,
    setType,
    setPreviewUrl,
    setTextContent,
    setTextAlign,
  } = createContentStore();

  const modifyClickHandler = () => {
    setWordseed(wordseed);
    setWordId(wordId);
    setType(postType as "TEXT" | "PAINT" | "MUSIC" | "VIDEO");
    setPreviewUrl(url);
    setTextContent(content);
    setTextAlign(postAlign);
  };

  const deleteFeed = useDeleteFeed({ postId, wordId, postType, userId });
  const deleteClickHandler = () => {
    if (confirm("삭제하시겠습니까?")) deleteFeed.mutate();
  };

  return (
    <div
      className={`${
        showPopover ? styles["popover-content"] : styles["hidden"]
      }`}
    >
      <Link
        href={{
          pathname: `/modify/${postId}`,
          query: { from: pathName },
        }}
        replace
      >
        <Button content={"수정"} onClick={modifyClickHandler} />
      </Link>
      <Button content={"삭제"} onClick={deleteClickHandler} />
    </div>
  );
}

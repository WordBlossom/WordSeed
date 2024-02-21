"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./comment.module.scss";
import Button from "@/components/Button/Button";

export default function CommentInput() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [commentText, setCommentText] = useState<string>("");
  const [isTextareaFocused, setIsTextareaFocused] = useState<boolean>(false);

  const handleClickButton = () => {
    if (!isTextareaFocused) return;
    if (!commentText.length) return;
    // commentText 댓글 등록 요청
    console.log(commentText);
    setCommentText("");
  };
  return (
    <div className={styles["comment-input"]}>
      <textarea
        ref={textareaRef}
        autoComplete="off"
        className={styles["textarea"]}
        placeholder="  어떤 느낌을 받으셨나요?"
        onFocus={() => setIsTextareaFocused(true)}
        onBlur={() => setIsTextareaFocused(false)}
        onChange={(e) => setCommentText(e.target.value)}
        value={commentText}
      ></textarea>
      <Button
        content={"등록"}
        isActive={isTextareaFocused}
        onMouseDown={handleClickButton}
      />
    </div>
  );
}

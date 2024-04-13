"use client";

import { useRef } from "react";
import useCommentToggleStateStore from "@/stores/comment-toggle";
import CommentClose from "./comment-close";
import CommentContainer from "./comment-container";
import CommentInput from "./comment-input";
import styles from "./comment.module.scss";

export default function Comment() {
  const { commentPostId } = useCommentToggleStateStore();
  const commentContainerRef = useRef<HTMLDivElement>(null);
  // feedlist page에서 작품 id를 prop 받고
  // container에 id 넘겨서 infinity query
  // input에 id 넘겨서 댓글 등록
  return (
    <div className={styles["comment"]}>
      <CommentClose />
      <CommentContainer
        commentContainerRef={commentContainerRef}
        commentPostId={commentPostId}
      />
      <CommentInput
        commentContainerRef={commentContainerRef}
        commentPostId={commentPostId}
      />
    </div>
  );
}

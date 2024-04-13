"use client";

import { MutableRefObject } from "react";
import { useInView } from "react-intersection-observer";
import { useCommentList } from "@/api/comment/";
import CommentItem from "./comment-item";
import styles from "./comment.module.scss";

type CommentContainerProps = {
  commentContainerRef: MutableRefObject<HTMLDivElement | null>;
  commentPostId: number;
};

export default function CommentContainer({
  commentContainerRef,
  commentPostId,
}: CommentContainerProps) {
  const { status, data, fetchNextPage } = useCommentList({
    params: {
      postId: commentPostId,
    },
  });

  const [ref] = useInView({
    onChange: (inView) => {
      if (inView) {
        fetchNextPage();
      }
    },
  });

  return (
    <>
      {status === "pending" && "Loading..."}
      {status === "success" && (
        <div ref={commentContainerRef} className={styles["comment-container"]}>
          {data.pages.map((comment, idx) => (
            <div
              key={comment.commentId}
              ref={idx === data.pages.length - 2 ? ref : undefined}
            >
              <CommentItem comment={comment} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

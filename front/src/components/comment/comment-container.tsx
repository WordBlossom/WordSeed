"use client";

import { useInView } from "react-intersection-observer";
import { useCommentList } from "@/api/comment/";
import CommentItem from "./comment-item";
import styles from "./comment.module.scss";

type CommentContainerProps = {
  commentPostId: number;
};

export default function CommentContainer({
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
        <div className={styles["comment-container"]}>
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

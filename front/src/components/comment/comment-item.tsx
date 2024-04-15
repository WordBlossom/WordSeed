"use client";

import Link from "next/link";
import { Comment } from "@/api/comment/types";
import { useDeleteComment } from "@/api/comment";
import Button from "@/components/Button/Button";
import styles from "./comment.module.scss";

type CommentItemProps = {
  comment: Comment;
};

export default function CommentItem({ comment }: CommentItemProps) {
  const deleteComment = useDeleteComment({
    commentId: comment.commentId,
    postId: comment.postId,
  });
  const handleModifyClick = () => {};
  const handleDeleteClick = () => {
    if (confirm("삭제하시겠습니까?")) {
      deleteComment.mutate();
    }
  };

  // 임시 myID
  const myId = 4;

  return (
    <div className={styles["comment-item"]}>
      <div className={styles["comment-content"]}>{comment.content}</div>
      <div className={styles["comment-item-bottom"]}>
        <Link className={styles["link"]} href={`/profile/${comment.userId}`}>
          - {comment.userName}
        </Link>
        {myId === comment.userId && (
          <Button type="small" content={"삭제"} onClick={handleDeleteClick} />
        )}
        {/* <div className={styles["button-wrapper"]}>
        <Button type="small" content={"수정"} onClick={handleModifyClick} />
        </div> */}
      </div>
    </div>
  );
}

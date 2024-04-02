import Link from "next/link";
import Button from "@/components/Button/Button";
import { Comment } from "@/api/comment/types";
import styles from "./comment.module.scss";

type CommentItemProps = {
  comment: Comment;
};

export default function CommentItem({ comment }: CommentItemProps) {
  const handleModifyClick = () => {};
  const handleDeleteClick = () => {
    // 댓글 삭제 요청
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

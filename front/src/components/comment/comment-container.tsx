import styles from "./comment.module.scss";
import CommentItem from "./comment-item";

export default function CommentContainer() {
  return (
    <div className={styles["comment-container"]}>
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
    </div>
  );
}

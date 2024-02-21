import styles from "./comment.module.scss";
import CommentClose from "./comment-close";
import CommentContainer from "./comment-container";
import CommentInput from "./comment-input";
export default function Comment() {
  // feedlist page에서 작품 id를 prop 받고
  // container에 id 넘겨서 infinity query
  // input에 id 넘겨서 댓글 등록
  return (
    <div className={styles["comment"]}>
      <CommentClose />
      <CommentContainer />
      <CommentInput />
    </div>
  );
}

import styles from "./comment.module.scss";
import Button from "@/components/Button/Button";
import useCommentToggleStateStore from "@/stores/comment-toggle";

export default function CommentClose() {
  const { setCommentToggle } = useCommentToggleStateStore();
  const handleClick = () => {
    setCommentToggle(false);
  };
  return (
    <div className={styles["close"]}>
      <Button content={"닫기"} onClick={handleClick}></Button>
    </div>
  );
}

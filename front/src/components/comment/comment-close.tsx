import { getQueryClient } from "@/lib/react-query";
import useCommentToggleStateStore from "@/stores/comment-toggle";
import Button from "@/components/Button/Button";
import styles from "./comment.module.scss";

export default function CommentClose() {
  const queryClient = getQueryClient();
  const { setCommentToggle } = useCommentToggleStateStore();
  const handleClick = () => {
    setCommentToggle(false);
    queryClient.removeQueries({ queryKey: ["commentList"] });
  };
  return (
    <div className={styles["close"]}>
      <Button content={"닫기"} onClick={handleClick}></Button>
    </div>
  );
}

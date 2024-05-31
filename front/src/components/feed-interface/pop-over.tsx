import { useDeleteFeed } from "@/api/feed/hooks/delete-feed";
import Button from "@/components/Button/Button";
import { FeedDetail } from "@/api/feed/types";
import styles from "./feed-interface.module.scss";

type PopoverProps = {
  showPopover: boolean;
  postId: FeedDetail["postId"];
  wordId: FeedDetail["wordId"];
  postType: FeedDetail["postType"];
  userId: FeedDetail["userId"];
};

export default function Popover({
  showPopover,
  wordId,
  postId,
  postType,
  userId,
}: PopoverProps) {
  const deleteFeed = useDeleteFeed({ postId, wordId, postType, userId });
  const deleteClickHandler = () => {
    if (confirm("삭제하시겠습니까?")) {
      deleteFeed.mutate();
    }
  };

  return (
    <div
      className={`${
        showPopover ? styles["popover-content"] : styles["hidden"]
      }`}
    >
      <li>수정</li>
      <Button content={"삭제"} onClick={deleteClickHandler} />
    </div>
  );
}

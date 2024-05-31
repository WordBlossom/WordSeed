import { useDeleteFeed } from "@/api/feed/hooks/delete-feed";
import Button from "@/components/Button/Button";
import { FeedDetail, FeedList, InfiniteQueriesUpdater } from "@/api/feed/types";
import styles from "./feed-interface.module.scss";

type PopoverProps = {
  showPopover: boolean;
  postId: FeedDetail["postId"];
  wordId: FeedDetail["wordId"];
  postType: FeedDetail["postType"];
};

export default function Popover({
  showPopover,
  wordId,
  postId,
  postType,
}: PopoverProps) {
  const deleteFeed = useDeleteFeed({ postId, wordId, postType });

  return (
    <div
      className={`${
        showPopover ? styles["popover-content"] : styles["hidden"]
      }`}
    >
      <li>수정</li>
      <Button content={"삭제"} onClick={() => deleteFeed.mutate()} />
    </div>
  );
}

import FollowButton from "@/components/Button/follow-button";
import BookmarkButton from "../Button/bookmark-button";
import LikeButton from "../Button/like-button";
import CommentButton from "../Button/comment-button";
import styles from "./feed-interface.module.scss";

type FeedInterfaceBottomProps = {
  userName: string;
  interfaceInfo: boolean[];
};

export default function FeedInterfaceBottom({
  userName,
  interfaceInfo,
}: FeedInterfaceBottomProps) {
  const [liked, bookMarked, subscribed] = interfaceInfo;
  return (
    <div className={styles["interface-bottom-container"]}>
      <div className={styles["artist-wrapper"]}>
        <span className={styles["artist-name"]}>{userName}</span>
        <FollowButton isFollow={subscribed} />
      </div>
      <div className={styles["button-wrapper"]}>
        <BookmarkButton isBookMarked={bookMarked} />
        <LikeButton isLiked={liked} />
        <CommentButton />
      </div>
    </div>
  );
}

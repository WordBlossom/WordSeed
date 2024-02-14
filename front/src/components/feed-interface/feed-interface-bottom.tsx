import styles from "./feed-interface.module.scss";
import FollowButton from "@/components/Button/follow-button";
import BookmarkButton from "../Button/bookmark-button";
import LikeButton from "../Button/like-button";
import CommentButton from "../Button/comment-button";

export default function FeedInterfaceBottom() {
  return (
    <div className={styles["interface-bottom-container"]}>
      <div className={styles["artist-wrapper"]}>
        <span className={styles["artist-name"]}>초아누리</span>
        <FollowButton />
      </div>
      <div className={styles["button-wrapper"]}>
        <BookmarkButton />
        <LikeButton />
        <CommentButton />
      </div>
    </div>
  );
}

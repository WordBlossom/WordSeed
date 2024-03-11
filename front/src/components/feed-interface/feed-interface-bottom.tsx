import FollowButton from "@/components/Button/follow-button";
import BookmarkButton from "../Button/bookmark-button";
import LikeButton from "../Button/like-button";
import CommentButton from "../Button/comment-button";
import { FeedDetail } from "@/api/feed/types";
import styles from "./feed-interface.module.scss";

type FeedInterfaceProps = {
  feedData: FeedDetail;
};

export default function FeedInterfaceBottom({ feedData }: FeedInterfaceProps) {
  const { userName, userId, postId, wordId, subscribed, bookMarked, liked } = {
    ...feedData,
  };
  return (
    <div className={styles["interface-bottom-container"]}>
      <div className={styles["artist-wrapper"]}>
        <span className={styles["artist-name"]}>{userName}</span>
        <FollowButton isFollow={subscribed} />
      </div>
      <div className={styles["button-wrapper"]}>
        <BookmarkButton
          postId={postId}
          wordId={wordId}
          bookMarked={bookMarked}
        />
        <LikeButton isLiked={liked} />
        <CommentButton />
      </div>
    </div>
  );
}

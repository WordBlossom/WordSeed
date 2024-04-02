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
  const {
    userName,
    userId,
    postId,
    wordId,
    postType,
    subscribed,
    bookMarked,
    liked,
  } = {
    ...feedData,
  };

  // 임시로 내 userId 설정, follow 버튼 렌더링 유무
  const myId = 4;
  return (
    <div className={styles["interface-bottom-container"]}>
      <div className={styles["artist-wrapper"]}>
        <span className={styles["artist-name"]}>{userName}</span>
        {myId !== userId && (
          <FollowButton userId={userId} subscribed={subscribed} />
        )}
      </div>
      <div className={styles["button-wrapper"]}>
        <BookmarkButton
          postId={postId}
          wordId={wordId}
          postType={postType}
          bookMarked={bookMarked}
        />
        <LikeButton
          postId={postId}
          wordId={wordId}
          postType={postType}
          liked={liked}
        />
        <CommentButton postId={postId} />
      </div>
    </div>
  );
}

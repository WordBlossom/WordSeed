"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import FollowButton from "@/components/Button/follow-button";
import MoreVertButton from "@/components/Button/more-vert-button";
import BookmarkButton from "@/components/Button/bookmark-button";
import LikeButton from "@/components/Button/like-button";
import CommentButton from "@/components/Button/comment-button";
import Popover from "./pop-over";
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
  const [showPopover, setShowPopover] = useState(false);

  useEffect(() => {
    if (showPopover) setShowPopover((prev) => !prev);
  }, [postId]);

  // 임시로 내 userId 설정, follow 버튼 렌더링 유무
  const myId = 4;
  return (
    <div className={styles["interface-bottom-container"]}>
      <div className={styles["interface-bottom-common-wrapper"]}>
        <div className={styles["artist-wrapper"]}>
          {/* <span className={styles["artist-name"]}>{userName}</span> */}
          <Link className={styles["artist-name"]} href={`/profile/${userId}`}>
            <span>{userName}</span>
          </Link>

          {myId !== userId && (
            <FollowButton
              userId={userId}
              subscribed={subscribed}
              postId={postId}
              wordId={wordId}
              postType={postType}
            />
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
      {myId === userId && (
        <>
          <MoreVertButton setShowPopover={setShowPopover} />
          <Popover
            showPopover={showPopover}
            postId={postId}
            wordId={wordId}
            postType={postType}
            userId={userId}
          />
        </>
      )}
    </div>
  );
}

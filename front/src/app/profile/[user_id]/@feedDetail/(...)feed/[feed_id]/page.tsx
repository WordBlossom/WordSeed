"use client";

import style from "./feed.module.scss";
import { FeedContent, FeedInterface, Comment } from "@/components";
import useCommentToggleStateStore from "@/stores/comment-toggle";
import useFeedDetailStateStore from "@/stores/feed-detail";

export default function Feed() {
  const feed = useFeedDetailStateStore();
  const { commentToggle } = useCommentToggleStateStore();

  return (
    <>
      <div className={style["feed-container"]}>
        <FeedContent feedData={feed} />
        <FeedInterface feedData={feed} />
      </div>
      {commentToggle && <Comment />}
    </>
  );
}

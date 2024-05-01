"use client";

import { FeedDetail } from "@/api/feed/types";
import style from "./feed.module.scss";
import { FeedContent, FeedInterface, Comment } from "@/components";
import useCommentToggleStateStore from "@/stores/comment-toggle";
import { useFeedList } from "@/api/feed";
import { useFeedProps } from "@/hooks/useFeedProps";

type FeedType = {
  params: { feed_id: number; user_id: number };
};

export default function Feed({ params }: FeedType) {
  const myId = 4;
  const feedId = Number(params.feed_id);
  const isMe = myId === 4;

  const filterFnc = (feedData: FeedDetail) => feedData.postId === feedId;

  const [props] = useFeedProps(isMe);
  const { data, status } = useFeedList(props);
  const { commentToggle } = useCommentToggleStateStore();

  return (
    <div>
      {status === "success" &&
        data.pages.length &&
        data.pages.filter(filterFnc).map((feedData, idx) => {
          return (
            <div className={style["feed-container"]} key={idx}>
              <FeedContent feedData={feedData} />
              <FeedInterface feedData={feedData} />
            </div>
          );
        })}
      {commentToggle && <Comment />}
    </div>
  );
}

"use client";

import { useQuery } from "@tanstack/react-query";
import useCommentToggleStateStore from "@/stores/comment-toggle";
import { FeedContent, FeedInterface, Comment } from "@/components";
import style from "./feed.module.scss";
import { getFeedDetail } from "@/api/feed/apis/get-feed-api";

type FeedProps = {
  params: { feed_id: number };
};

export default function Feed({ params }: FeedProps) {
  const feedId = Number(params.feed_id);
  const { data } = useQuery({
    queryKey: ["feedDetail", feedId],
    queryFn: () => getFeedDetail({ postId: feedId }),
  });
  const { commentToggle } = useCommentToggleStateStore();

  return (
    <>
      {data && (
        <>
          <div className={style["feed-container"]}>
            <FeedContent feedData={data} />
            <FeedInterface feedData={data} type="detail" />
          </div>
          {commentToggle && <Comment />}
        </>
      )}
    </>
  );
}

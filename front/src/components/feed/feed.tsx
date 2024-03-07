import React from "react";
import { FeedDetail } from "@/api/feed/types";
import style from "./feed.module.scss";

type FeedContentProps = {
  feedData: FeedDetail;
};

function FeedContent({ feedData }: FeedContentProps) {
  return (
    <div className={style["content-container"]}>
      <div className={style["content-wrapper"]}>
        <div className={style["content"]}>{feedData.content}</div>
      </div>
    </div>
  );
}

export default React.memo(FeedContent);

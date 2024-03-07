import React from "react";
import FeedInterfaceTop from "./feed-interface-top";
import FeedInterfaceBottom from "./feed-interface-bottom";
import { FeedDetail } from "@/api/feed/types";
import styles from "./feed-interface.module.scss";

type FeedInterfaceProps = {
  feedData: FeedDetail;
};
function FeedInterface({ feedData }: FeedInterfaceProps) {
  return (
    <div className={styles["feed-interface-container"]}>
      <FeedInterfaceTop createdAt={feedData.createdAt} />
      <FeedInterfaceBottom feedData={feedData} />
    </div>
  );
}

export default React.memo(FeedInterface);

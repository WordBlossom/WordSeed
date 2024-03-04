import FeedInterfaceTop from "./feed-interface-top";
import FeedInterfaceBottom from "./feed-interface-bottom";
import { FeedDetail } from "@/api/feed/types";
import styles from "./feed-interface.module.scss";

type FeedInterfaceProps = {
  feedData: FeedDetail;
};

export default function FeedInterface({ feedData }: FeedInterfaceProps) {
  const createdAt = feedData.createdAt;
  const userName = feedData.userName;
  const interfaceInfo = [
    feedData.liked,
    feedData.bookMarked,
    feedData.subscribed,
  ];
  return (
    <div className={styles["feed-interface-container"]}>
      <FeedInterfaceTop createdAt={createdAt} />
      <FeedInterfaceBottom userName={userName} interfaceInfo={interfaceInfo} />
    </div>
  );
}

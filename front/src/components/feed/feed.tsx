import { FeedDetail } from "@/api/feed/types";
import { Paint, Video, Music } from "@/components/media";
import styles from "./feed.module.scss";

type FeedContentProps = {
  feedData: FeedDetail;
};

export default function FeedContent({ feedData }: FeedContentProps) {
  const { postType, url } = { ...feedData };

  return (
    <div className={styles["content-container"]}>
      <div className={styles["content-wrapper"]}>
        {postType === "TEXT" && (
          <div className={styles["text"]}>{feedData.content}</div>
        )}
        {postType === "PAINT" && <Paint dataUrl={url} />}
        {postType === "VIDEO" && <Video dataUrl={url} />}
        {postType === "MUSIC" && <Music dataUrl={url} />}
      </div>
    </div>
  );
}

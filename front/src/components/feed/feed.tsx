import { FeedDetail } from "@/api/feed/types";
import { Paint, Video, Music } from "@/components/media";
import styles from "./feed.module.scss";

type FeedContentProps = {
  feedData: FeedDetail;
};

const align = {
  LEFT: "alignLeft",
  CENTER: "alignCenter",
  RIGHT: "alignRight",
};

export default function FeedContent({ feedData }: FeedContentProps) {
  const { word, postAlign, content, postType, url } = { ...feedData };

  return (
    <div className={styles["content-container"]}>
      <div className={styles["content-wrapper"]}>
        <span className={styles["title-word"]}>{word}</span>
        {postType === "TEXT" && (
          <p className={`${styles["text"]} ${styles[align[postAlign]]}`}>
            {content}
          </p>
        )}
        {postType === "PAINT" && <Paint dataUrl={url} />}
        {postType === "VIDEO" && <Video dataUrl={url} />}
        {postType === "MUSIC" && <Music dataUrl={url} />}
      </div>
    </div>
  );
}

import styles from "./feed-interface.module.scss";

export default function FeedInterfaceBottom() {
  return (
    <div className={styles["interface-bottom-container"]}>
      <div className={styles["artist-wrapper"]}>
        <span className={styles["artist-name"]}>초아누리</span>
        <div>Follow</div>
      </div>
      <div className={styles["button-wrapper"]}>
        <div>Bookmark</div>
        <div>Like</div>
        <div>Reply</div>
      </div>
    </div>
  );
}

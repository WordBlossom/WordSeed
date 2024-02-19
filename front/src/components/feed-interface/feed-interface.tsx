import FeedInterfaceTop from "./feed-interface-top";
import FeedInterfaceBottom from "./feed-interface-bottom";
import styles from "./feed-interface.module.scss";

export default function FeedInterface() {
  return (
    <div className={styles["feed-interface-container"]}>
      <FeedInterfaceTop />
      <FeedInterfaceBottom />
    </div>
  );
}

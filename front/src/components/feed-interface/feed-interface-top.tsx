import { dateForm } from "@/utils/getDateUtils";
import styles from "./feed-interface.module.scss";

type FeedInterfaceTopProps = {
  createdAt: string;
};

export default function FeedInterfaceTop({ createdAt }: FeedInterfaceTopProps) {
  const createDate = dateForm(createdAt);
  return (
    <div className={styles["interface-top-container"]}>
      <span className={styles["create-date"]}>{createDate}</span>
    </div>
  );
}

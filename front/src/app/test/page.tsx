import { Icon } from "@/components";
import styles from "./styles.module.scss";

export default function page() {
  return (
    <div className={styles.test}>
      안녕
      <Icon iconName="copyBlack" />
    </div>
  );
}

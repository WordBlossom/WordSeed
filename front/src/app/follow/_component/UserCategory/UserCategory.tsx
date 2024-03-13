import { ToggleButton } from "@/components";
import styles from "./UserCategory.module.scss";

export default function UserCategory() {
  return (
    <div className={styles.wrapper}>
      <ToggleButton type="wide" toggleA="내 작품" toggleB="북마크" />
    </div>
  );
}

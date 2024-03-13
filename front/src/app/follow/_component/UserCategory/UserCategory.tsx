import { ToggleButton } from "@/components";
import styles from "./UserCategory.module.scss";

export default function UserCategory() {
  return (
    <div className={styles.wrapper}>
      <ToggleButton type="wide" toggleA="관심작가" toggleB="구독자" />
    </div>
  );
}

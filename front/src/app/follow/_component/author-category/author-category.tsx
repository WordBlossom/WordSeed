import { ToggleButton } from "@/components";
import styles from "./author-category.module.scss";

export default function AuthorCategory() {
  return (
    <div className={styles.wrapper}>
      <ToggleButton type="wide" toggleA="관심작가" toggleB="구독자" />
    </div>
  );
}

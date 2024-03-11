import styles from "./filter.module.scss";
import Icon from "@/components/Icon/Icon";
import useSearchFilterStateStore from "@/stores/search-filter";

export default function SortSwitch() {
  const { isLatest, setIsLatest } = useSearchFilterStateStore();
  return (
    <div className={styles["switch-container"]} onClick={() => setIsLatest()}>
      <div
        className={`${styles["switch-wrapper"]} ${
          isLatest ? styles["latest"] : ""
        }`}
      >
        <div>최신순</div>
        <div>좋아요순</div>
      </div>
      <Icon iconName="upDownArrow" size={12} />
    </div>
  );
}

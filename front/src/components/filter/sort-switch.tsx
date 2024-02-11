import styles from "./filter.module.scss";
import Icon from "@/components/Icon/Icon";
import useSearchFilterStateStore from "@/stores/search-filter";

export default function SortSwitch() {
  const { isLatest, setIsActive } = useSearchFilterStateStore();
  return (
    <div
      className={styles["switch-container"]}
      onClick={() => setIsActive("isLatest")}
    >
      <div
        className={`${styles["switch-wrapper"]} ${
          isLatest ? styles["latest"] : ""
        }`}
      >
        <span>최신순</span>
        <span>좋아요순</span>
      </div>
      <Icon iconName="upDownArrow" size={12} />
    </div>
  );
}

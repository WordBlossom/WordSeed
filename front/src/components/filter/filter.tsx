import Button from "@/components/Button/Button";
import SearchButton from "@/components/Button/search-button";
import useSearchFilterStateStore from "@/stores/search-filter";
import SortSwitch from "./sort-switch";
import styles from "./filter.module.scss";

type ContentCategoryType = {
  글: "TEXT";
  그림: "PAINT";
  영상: "VIDEO";
  음악: "MUSIC";
};

const contentCategory: ContentCategoryType = {
  글: "TEXT",
  그림: "PAINT",
  영상: "VIDEO",
  음악: "MUSIC",
};

export default function Filter() {
  const { selectedType, setIsActive } = useSearchFilterStateStore();
  const categories = Object.keys(
    contentCategory
  ) as (keyof ContentCategoryType)[];
  return (
    <div className={styles["filter-wrapper"]}>
      {categories.map((category) => (
        <Button
          key={category}
          content={category}
          isActive={selectedType === contentCategory[category]}
          onClick={() => setIsActive(contentCategory[category])}
        />
      ))}
      <SortSwitch />
      <SearchButton />
    </div>
  );
}

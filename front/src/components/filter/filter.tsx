import Button from "@/components/Button/Button";
import SearchButton from "@/components/Button/search-button";
import useSearchFilterStateStore from "@/stores/search-filter";
import SortSwitch from "./sort-switch";
import styles from "./filter.module.scss";

type ContentCategoryType = {
  글: "text";
  그림: "paint";
  영상: "video";
  음악: "music";
};

const contentCategory: ContentCategoryType = {
  글: "text",
  그림: "paint",
  영상: "video",
  음악: "music",
};

export default function Filter() {
  const searchFilterStateStore = useSearchFilterStateStore();
  const categories = Object.keys(
    contentCategory
  ) as (keyof ContentCategoryType)[];
  return (
    <div className={styles["filter-wrapper"]}>
      {categories.map((category) => (
        <Button
          key={category}
          content={category}
          isActive={searchFilterStateStore[contentCategory[category]]}
          onClick={() =>
            searchFilterStateStore.setIsActive(contentCategory[category])
          }
        />
      ))}
      <SortSwitch />
      <SearchButton />
    </div>
  );
}

import Button from "@/components/Button/Button";
import styles from "./create-category.module.scss";
import { Dispatch, SetStateAction } from "react";
import createContentStore from "@/stores/create-content";

type CreateCategoryProps = {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
};

export default function CreateCategory({
  selectedCategory,
  setSelectedCategory,
}: CreateCategoryProps) {
  const useContentStore = createContentStore();

  type CategoryType = "text" | "paint" | "video" | "music";

  const categories: { [key: string]: CategoryType } = {
    글: "text",
    그림: "paint",
    영상: "video",
    음악: "music",
  };

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const categoryKey = e.currentTarget.textContent as string;
    const categoryValue = categories[categoryKey];
    setSelectedCategory(categoryKey);
    useContentStore.setType(categoryValue);
  };

  return (
    <div className={styles["filter-wrapper"]}>
      {Object.keys(categories).map((category) => (
        <Button
          key={category}
          content={category}
          isActive={selectedCategory === category ? true : false}
          onClick={clickHandler}
        />
      ))}
    </div>
  );
}

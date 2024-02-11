import Button from "@/components/Button/Button";
import styles from "./create-category.module.scss";
import { Dispatch, SetStateAction } from "react";

type CreateCategoryProps = {
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
};

export default function CreateCategory({
  selectedCategory,
  setSelectedCategory,
}: CreateCategoryProps) {
  const categories = ["글", "그림", "영상", "음악"];

  return (
    <div className={styles["filter-wrapper"]}>
      {categories.map((category) => (
        <Button
          key={category}
          content={category}
          isActive={selectedCategory === category ? true : false}
          onClick={() => setSelectedCategory(category)}
        />
      ))}
    </div>
  );
}

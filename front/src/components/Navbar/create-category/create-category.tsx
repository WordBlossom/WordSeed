import Button from "@/components/Button/Button";
import styles from "./create-category.module.scss";
import createContentStore from "@/stores/create-content";

export default function CreateCategory() {
  const useContentStore = createContentStore();

  type CategoryType = "TEXT" | "PAINT" | "MUSIC" | "VIDEO";

  const categories: { [key: string]: CategoryType } = {
    글: "TEXT",
    그림: "PAINT",
    영상: "MUSIC",
    음악: "VIDEO",
  };

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const categoryKey = e.currentTarget.textContent as string;
    const categoryValue = categories[categoryKey];
    useContentStore.setType(categoryValue);
  };

  return (
    <div className={styles["filter-wrapper"]}>
      {Object.keys(categories).map((category) => (
        <Button
          key={category}
          content={category}
          isActive={
            useContentStore.type === categories[category] ? true : false
          }
          onClick={clickHandler}
        />
      ))}
    </div>
  );
}

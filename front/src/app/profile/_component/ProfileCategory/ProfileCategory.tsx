import { Filter, ToggleButton } from "@/components";
import styles from "./ProfileCategory.module.scss";
import { Ref } from "react";

interface ProfileCategoryProps {
  categoryRef: Ref<HTMLDivElement>;
  params: { user_id: number };
}

export default function ProfileCategory({
  params,
  categoryRef,
}: ProfileCategoryProps) {
  const myId = 1;

  return (
    <div className={styles.wrapper} ref={categoryRef}>
      {myId === params.user_id && (
        <ToggleButton type="wide" toggleA="내 작품" toggleB="북마크" />
      )}
      <Filter />
    </div>
  );
}

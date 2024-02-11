"use client";

import { useState } from "react";
import IncludeMenu from "./include-menu/include-menu";
import styles from "./navbar.module.scss";
import Button from "../Button/Button";
import FilterButton from "../Button/filter-button";
import Filter from "../filter/filter";
import useFilterButtonHiddenStateStore from "@/stores/profile-filter";
type ProfileNavbarProps = {
  userId: string;
};

export default function ProfileNavbar({ userId }: ProfileNavbarProps) {
  const { isFilterButtonHidden } = useFilterButtonHiddenStateStore();
  const [isMyWorks, setIsMyworks] = useState(true);
  const [isFilterHidden, setFilterIsHidden] = useState(true);
  // userId로 본인 여부 판단
  // 본인이면 내 작품, 북마크 표시
  // 본인 아니면 표시 안함

  const handleClickMyWorks = () => {
    if (isMyWorks) return;
    setIsMyworks((prev) => !prev);
    // 내 작품 호출
    return;
  };
  const handleClickBookmark = () => {
    if (!isMyWorks) return;
    setIsMyworks((prev) => !prev);
    // 북마크 호출
    return;
  };

  return (
    <IncludeMenu>
      {!isFilterButtonHidden && (
        <div className={styles["right-icon-container"]}>
          <Button
            content={"내 작품"}
            isActive={isMyWorks}
            onClick={handleClickMyWorks}
          />
          <Button
            content={"북마크"}
            isActive={!isMyWorks}
            onClick={handleClickBookmark}
          />
          <FilterButton
            isHidden={isFilterHidden}
            setIsHidden={setFilterIsHidden}
          />
          {!isFilterHidden && (
            <div className={styles["filter-container"]}>
              <Filter />
            </div>
          )}
        </div>
      )}
    </IncludeMenu>
  );
}

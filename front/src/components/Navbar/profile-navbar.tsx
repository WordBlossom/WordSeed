"use client";

import { useState } from "react";
import IncludeMenu from "./include-menu/include-menu";
import styles from "./navbar.module.scss";
import FilterButton from "../Button/filter-button";
import Filter from "../filter/filter";
import useFilterButtonHiddenStateStore from "@/stores/profile-filter";
import { ToggleButton } from "@/components";
type ProfileNavbarProps = {
  userId: string;
};

export default function ProfileNavbar({ userId }: ProfileNavbarProps) {
  const { isFilterButtonHidden } = useFilterButtonHiddenStateStore();
  const [isFilterHidden, setFilterIsHidden] = useState(true);
  // userId로 본인 여부 판단
  // 임시 본인 아이디 1
  const myId = "1";
  // 본인이면 내 작품, 북마크 표시
  // 본인 아니면 표시 안함

  return (
    <IncludeMenu>
      {!isFilterButtonHidden && (
        <div className={styles["right-icon-container"]}>
          {myId === userId && (
            <ToggleButton toggleA="내 작품" toggleB="북마크" />
          )}
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

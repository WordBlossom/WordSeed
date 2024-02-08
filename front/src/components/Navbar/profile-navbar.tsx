"use client";

import IncludeMenu from "./include-menu/include-menu";
import BackButton from "../Button/back-button";
import styles from "./navbar.module.scss";
import Button from "../Button/Button";
import FilterButton from "../Button/filter-button";

type ProfileNavbarProps = {
  userId: string;
};

export default function ProfileNavbar({ userId }: ProfileNavbarProps) {
  // userId로 본인 여부 판단
  return (
    <IncludeMenu>
      <div className={styles["right-icon-container"]}>
        <Button content={"내 작품"} onClick={() => {}} />
        <Button content={"북마크"} onClick={() => {}} />
        <FilterButton />
      </div>
    </IncludeMenu>
  );
}

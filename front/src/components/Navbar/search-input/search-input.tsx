"use client";

import Icon from "@/components/Icon/Icon";
import styles from "./search-input.module.scss";
import { useState } from "react";

export default function SearchInput() {
  const [searchWord, setSearchWord] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
    // 데이터 요청
  };
  console.log(searchWord);
  return (
    <div className={styles["input-wrapper"]}>
      <Icon iconName="search" size={16} />
      <input
        type="text"
        autoFocus={true}
        placeholder={"검색"}
        value={searchWord}
        onChange={handleChange}
      ></input>
    </div>
  );
}

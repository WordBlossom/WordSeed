"use client";

import useSearchPageStateStore from "@/stores/search-page";
import Icon from "@/components/Icon/Icon";
import styles from "./search-input.module.scss";

export default function SearchInput() {
  const { searchKeyword, setSearchKeyword } = useSearchPageStateStore();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    setSearchKeyword(keyword);
    // 데이터 요청
  };
  return (
    <div className={styles["input-wrapper"]}>
      <Icon iconName="search" size={16} />
      <input
        type="text"
        autoFocus={true}
        placeholder={"검색"}
        value={searchKeyword}
        onChange={handleChange}
      ></input>
    </div>
  );
}

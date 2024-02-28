"use client";

import SearchButtons from "./_component/search-buttons";
import SearchList from "./_component/search-list";
import style from "./_component/search.module.scss";

export default function Search() {
  return (
    <main className={style["main"]}>
      <SearchButtons />
      <SearchList />
    </main>
  );
}

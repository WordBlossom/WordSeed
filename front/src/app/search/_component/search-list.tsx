"use client";

import useSearchPageStateStore from "@/stores/search-page";
import SearchGuidance from "./search-guidance";
import { WordSeedList } from "@/components";
import { ArtistCardList } from "@/components";
import style from "./search.module.scss";

export default function SearchList() {
  const { searchKeyword, isWordseed } = useSearchPageStateStore();
  return (
    <div className={style["list-container"]}>
      {!searchKeyword && <SearchGuidance />}
      {searchKeyword && isWordseed && <WordSeedList />}
      {searchKeyword && !isWordseed && <ArtistCardList />}
    </div>
  );
}

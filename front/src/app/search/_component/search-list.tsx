"use client";

import { useInView } from "react-intersection-observer";
import { useWordseedList } from "@/api/wordseed";
import { useAuthorList } from "@/api/author";
import useSearchPageStateStore from "@/stores/search-page";
import SearchGuidance from "./search-guidance";
import { WordSeedList } from "@/components";
import { ArtistCardList } from "@/components";

import style from "./search.module.scss";

export default function SearchList() {
  const { searchKeyword, isWordseed } = useSearchPageStateStore();

  const {
    status: wordseedListStatus,
    data: wordseedListData,
    fetchNextPage: wordseedListFetchNextPage,
  } = useWordseedList({
    params: {
      query: searchKeyword,
    },
  });

  const {
    status: authorListStatus,
    data: authorListData,
    fetchNextPage: authorListFetchNextPage,
  } = useAuthorList({
    params: {
      query: searchKeyword,
    },
  });

  return (
    <div className={style["list-container"]}>
      {!searchKeyword && <SearchGuidance />}
      {searchKeyword && isWordseed && (
        <WordSeedList
          data={wordseedListData?.pages}
          fetchNextPage={wordseedListFetchNextPage}
        />
      )}
      {searchKeyword && !isWordseed && (
        <ArtistCardList
          data={authorListData?.pages}
          fetchNextPage={authorListFetchNextPage}
        />
      )}
    </div>
  );
}

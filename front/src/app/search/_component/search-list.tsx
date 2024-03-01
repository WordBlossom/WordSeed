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
      {/* {searchKeyword && !isWordseed && <ArtistCardList datas={fakeDatas} />} */}
    </div>
  );
}

const fakeDatas = [
  {
    userId: 1,
    userName: "초아누리",
    userDecp:
      "모든순간을 사랑하며 살고싶은 사람 모든순간을 사랑하며 살고싶은 사람",
    recvCnt: 1500,
    sendCnt: 232122131,
    subscribed: true,
  },
  {
    userId: 2,
    userName: "초아누리",
    userDecp:
      "모든순간을 사랑하며 살고싶은 사람 모든순간을 사랑하며 살고싶은 사람",
    recvCnt: 10,
    sendCnt: 200,
    subscribed: true,
  },
  {
    userId: 3,
    userName: "초아누리",
    userDecp:
      "모든순간을 사랑하며 살고싶은 사람 모든순간을 사랑하며 살고싶은 사람",
    recvCnt: 10,
    sendCnt: 200,
    subscribed: false,
  },
  {
    userId: 4,
    userName: "초아누리",
    userDecp:
      "모든순간을 사랑하며 살고싶은 사람 모든순간을 사랑하며 살고싶은 사람",
    recvCnt: 10,
    sendCnt: 200,
    subscribed: true,
  },
  {
    userId: 5,
    userName: "초아누리",
    userDecp:
      "모든순간을 사랑하며 살고싶은 사람 모든순간을 사랑하며 살고싶은 사람",
    recvCnt: 10,
    sendCnt: 200,
    subscribed: false,
  },
  {
    userId: 6,
    userName: "초아누리",
    userDecp:
      "모든순간을 사랑하며 살고싶은 사람 모든순간을 사랑하며 살고싶은 사람",
    recvCnt: 10,
    sendCnt: 200,
    subscribed: false,
  },
  {
    userId: 7,
    userName: "초아누리",
    userDecp:
      "모든순간을 사랑하며 살고싶은 사람 모든순간을 사랑하며 살고싶은 사람",
    recvCnt: 10,
    sendCnt: 200,
    subscribed: true,
  },
  {
    userId: 8,
    userName: "초아누리",
    userDecp:
      "모든순간을 사랑하며 살고싶은 사람 모든순간을 사랑하며 살고싶은 사람",
    recvCnt: 10,
    sendCnt: 200,
    subscribed: false,
  },
];

"use client";
import { useInView } from "react-intersection-observer";
import Wordseed from "@/components/WordSeed/WordSeed";
import NoData from "./component/no-data";
import useSearchPageStateStore from "@/stores/search-page";
import { useWordseedList } from "@/api/wordseed";
import styles from "./WordSeedList.module.scss";

// route 판별해서 말씨 목록 페이지이면 모든 데이터 조회하는 요청
// search 페이지이면 아래와 같이 요청

export default function WordSeedList() {
  const { searchKeyword } = useSearchPageStateStore();
  const { status, data, fetchNextPage } = useWordseedList({
    params: {
      query: searchKeyword,
    },
  });
  const [ref] = useInView({
    onChange: (inView) => {
      if (inView) fetchNextPage();
    },
  });

  return (
    <div className={styles.container}>
      {/* {status === "pending" && <p>Loading...</p>} */}
      {status === "success" && data.pages.length === 0 && (
        <NoData searchKeyword={searchKeyword} />
      )}
      {status === "success" && (
        <>
          {data.pages.map((wordseed, idx) => (
            <div
              key={idx}
              ref={idx === data.pages.length - 5 ? ref : undefined}
            >
              <Wordseed
                // 나중에는 key값을 날짜로 수정해야함
                date={wordseed.createdAt}
                wordseed={wordseed.word}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

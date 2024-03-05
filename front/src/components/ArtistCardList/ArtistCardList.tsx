"use client";
import { useInView } from "react-intersection-observer";
import { ArtistCard } from "..";
import useSearchPageStateStore from "@/stores/search-page";
import { useAuthorList } from "@/api/author";
import styles from "./ArtistCardList.module.scss";

// route 판별해서 관심작가 목록 페이지이면 관심작가 데이터 조회하는 요청
// search 페이지이면 아래와 같이 요청

export default function ArtistCardList() {
  const { searchKeyword } = useSearchPageStateStore();
  const { status, data, fetchNextPage } = useAuthorList({
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
      {status === "success" && data.pages.length === 0 && (
        <>{searchKeyword} 데이터 없음</>
      )}
      {status === "success" && (
        <>
          {data.pages.map((Author, idx) => (
            <div
              key={idx}
              ref={idx === data.pages.length - 5 ? ref : undefined}
            >
              <ArtistCard
                userId={Author.userId}
                userName={Author.userName}
                userDecp={Author.userDecp}
                recvCnt={Author.recvCnt}
                sendCnt={Author.sendCnt}
                subscribed={Author.subscribed}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

{
  /* {datas.map((data) => (
  <ArtistCard
    key={data.userId}
    userId={data.userId}
    userName={data.userName}
    userDecp={data.userDecp}
    recvCnt={data.recvCnt}
    sendCnt={data.sendCnt}
    subscribed={data.subscribed}
  />
))} */
}

"use client";

import { useInView } from "react-intersection-observer";
import { ArtistCard } from "..";
import { Author } from "@/api/author/types";
import { ArtistCardListFetchNextPage } from "./types";
import styles from "./ArtistCardList.module.scss";

type ArtistCardListProps = {
  data: Author[] | undefined;
  fetchNextPage: ArtistCardListFetchNextPage;
};

export default function ArtistCardList({
  data,
  fetchNextPage,
}: ArtistCardListProps) {
  const [ref] = useInView({
    onChange: (inView) => {
      if (inView) fetchNextPage();
    },
  });

  return (
    <div className={styles.container}>
      {data?.map((Author, idx) => (
        <div key={idx} ref={idx === data.length - 5 ? ref : undefined}>
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
    </div>
  );
}

"use client";

import { useInView } from "react-intersection-observer";
import { ContentCard } from "..";
import styles from "./ContentCardList.module.scss";
import { useFeedList } from "@/api/feed";
import { useFeedProps } from "@/hooks/useFeedProps";

export default function ContentCardList({ userId }: { userId: number }) {
  const myId = 4;
  const isMe = myId === userId;

  const [props] = useFeedProps(isMe);

  const { data, status, fetchNextPage } = useFeedList(props);

  const [ref] = useInView({
    onChange: (inView) => {
      if (inView) fetchNextPage();
    },
  });

  return (
    <>
      {status === "success" && !data.pages.length && <p>결과 없음</p>}
      {status === "success" && data.pages.length && (
        <div className={styles.container}>
          {data.pages.map((feedData, idx) => (
            <div
              key={feedData.postId}
              ref={idx === data.pages.length - 5 ? ref : undefined}
            >
              <ContentCard key={feedData.postId} data={feedData} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

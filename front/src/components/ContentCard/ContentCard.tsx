"use client";

import { FeedDetail } from "@/api/feed/types";
import styles from "./ContentCard.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import useFeedDetailStateStore from "@/stores/feed-detail";

export default function ContentCard(data: FeedDetail) {
  const contentClassName = `${styles.content} ${
    styles[data.postAlign.toLowerCase()]
  }`;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ref] = useInView({
    threshold: 0.8,
    onChange(inView) {
      if (inView) {
        videoRef?.current?.play();
      } else {
        videoRef?.current?.pause();
      }
    },
    initialInView: true,
  });

  const { setFeedDetail } = useFeedDetailStateStore();

  return (
    <Link
      className={styles.link}
      href={`/feed/${data.postId}`}
      // as={`/feed/${data.postId}`}
      ref={ref}
      onClick={() => {
        setFeedDetail(data);
      }}
    >
      {data.postType === "TEXT" ? (
        <main className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles["text-section"]}>
              <p className={styles.title}>{data.word}</p>
              <p className={contentClassName}>{data.content}</p>
            </div>
            <p className={styles.artist}>{data.userName}</p>
          </div>
        </main>
      ) : (
        <main className={styles.media}>
          {data.postType === "PAINT" && <Image src={data.url} alt="12" fill />}
          {data.postType === "VIDEO" && (
            <video
              ref={videoRef}
              muted
              width={"100%"}
              poster="placeholder.png"
              preload={"none"}
              playsInline
              src={data.url}
            ></video>
          )}
          {data.postType === "MUSIC" && <audio src={data.url} controls />}
        </main>
      )}
    </Link>
  );
}

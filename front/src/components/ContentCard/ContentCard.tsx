"use client";

import { FeedDetail } from "@/api/feed/types";
import styles from "./ContentCard.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";

export default function ContentCard({
  postId,
  postType,
  postAlign,
  word,
  content,
  userName,
  url,
}: FeedDetail) {
  const contentClassName = `${styles.content} ${
    styles[postAlign.toLowerCase()]
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

  return (
    <Link className={styles.link} href={`/feed/${postId}`} ref={ref}>
      {postType === "TEXT" ? (
        <main className={styles.container}>
          <div className={styles.wrapper}>
            <p className={styles.title}>{word}</p>
            <p className={contentClassName}>{content}</p>
            <p className={styles.artist}>{userName}</p>
          </div>
        </main>
      ) : (
        <main className={styles.media}>
          {postType === "PAINT" && <Image src={url} alt="12" fill />}
          {postType === "VIDEO" && (
            <video
              ref={videoRef}
              muted
              width={"100%"}
              poster="placeholder.png"
              preload={"none"}
              playsInline
              src={url}
            ></video>
          )}
          {postType === "MUSIC" && <audio src={url} controls />}
        </main>
      )}
    </Link>
  );
}

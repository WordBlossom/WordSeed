"use client";

import styles from "./ContentCard.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

interface ContentCardProps {
  postId: number;
  type: "text" | "img" | "video" | "sound";
  title: string;
  content: string;
  textAlign: "start" | "center" | "end";
  userName: string;
  url: string;
}

export default function ContentCard({
  postId,
  type,
  title,
  content,
  textAlign,
  userName,
  url,
}: ContentCardProps) {
  const contentClassName = `${styles.content} ${styles[textAlign]}`;
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
      {type === "text" ? (
        <main className={styles.container}>
          <div className={styles.wrapper}>
            <p className={styles.title}>{title}</p>
            <p className={contentClassName}>{content}</p>
            <p className={styles.artist}>{userName}</p>
          </div>
        </main>
      ) : (
        <main className={styles.media}>
          {type === "img" && <Image src={url} alt="12" fill />}
          {type === "video" && (
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
          {type === "sound" && <audio src={url} controls />}
        </main>
      )}
    </Link>
  );
}

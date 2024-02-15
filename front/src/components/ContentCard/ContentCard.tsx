"use client";
import { useState } from "react";
import styles from "./ContentCard.module.scss";

interface ContentCardProps<T> {
  type: "text" | "img" | "video" | "sound"
  title: string;
  content: string;
  textAlign: "start" | "center" | "end";
  userName: string;
}

export default function ContentCard() {
  const content = "어설프어설프게 시작한 소개는\n 그렇게 나를 인식시킨다.";
  return (
    <main className={styles.container}>
      <p className={styles.title}>자기 소개</p>
      <p className={styles.content}>{content}</p>
      <p className={styles.artist}>초아누리</p>
    </main>
  );
}

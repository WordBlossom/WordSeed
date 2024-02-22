"use client";

import style from "./alram.module.scss";
import Link from "next/link";

// 날짜

// 오늘의 말씨
// 필명 님의 관심 작가가 되었습니다.
// 필명 님의 '말씨'가(이) 게시되었습니다
// '말씨'에 댓글이 등록되었습니다.
// '말씨 작품넘버'에 댓글이 등록되었습니다.

//prop 내용

type AlramItemProps = {
  type: number;
  date: number;
  wordseed?: string;
  authorName?: string;
  articleNum?: number;
};

type DateProps = AlramItemProps["date"];
type AlramContentProps = Omit<AlramItemProps, "date">;

const Date = (date: DateProps) => {
  return date;
};

const AlramContent = ({
  type,
  wordseed,
  authorName,
  articleNum,
}: AlramContentProps) => {
  if (type === 1)
    return (
      <p className={style["alram-content"]}>
        오늘의 말씨 - &apos;{wordseed}&apos;
      </p>
    );
  if (type === 2)
    return (
      <p className={style["alram-content"]}>
        {authorName} 님의 관심 작가가 되었습니다.
      </p>
    );
  if (type === 3)
    return (
      <p className={style["alram-content"]}>
        {authorName} 님의 &apos;{wordseed}&apos;가(이) 게시되었습니다.
      </p>
    );
  if (type === 4)
    return (
      <p className={style["alram-content"]}>
        &apos;{wordseed} <span>#{articleNum}</span>&apos;에 댓글이
        등록되었습니다.
      </p>
    );
};

export default function AlramItem({
  date,
  type,
  wordseed,
  authorName,
  articleNum,
}: AlramItemProps) {
  const linkPath = (): string => {
    if (type === 1) return `/${wordseed}`;
    if (type === 2) return `/profile/${authorId}`;
    if (type === 3) return `/feed/${postId}`;
    if (type === 4) return `/feed/${postId}`;
    return "";
  };

  return (
    <Link href={linkPath()} className={style["alram-item"]}>
      <Date date={3} />
      <AlramContent type={4} wordseed="무지개" articleNum={3} />
    </Link>
  );
}

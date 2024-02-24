"use client";

import style from "./alram.module.scss";
import Link from "next/link";

// 알람 내용 경우의 수
// 1. 오늘의 말씨
// 2. 필명 님의 관심 작가가 되었습니다.
// 3. 필명 님의 '말씨'가(이) 게시되었습니다
// 4. '말씨'에 댓글이 등록되었습니다.
// 5. '말씨 작품넘버'에 댓글이 등록되었습니다.

//prop 내용
type AlramItemProps = {
  type: number;
  date: string;
  wordseed?: string;
  authorName?: string;
  articleNum?: number;
};

type DateProps = { date: AlramItemProps["date"] };
type AlramContentProps = Omit<AlramItemProps, "date">;

const Date = ({ date }: DateProps) => {
  return <p className={style.date}>{date}</p>;
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

// 알람 내용을 구성할 데이터와 클릭 시 이동할 페이지에 대한 데이터 필요
// 현재 Prop 받는 5개는 알람 내용 구성에 대한 데이터
// 추가로 페이지 이동에 대한 데이터를 받아야 함
export default function AlramItem({
  date,
  type,
  wordseed,
  authorName,
  articleNum,
}: AlramItemProps) {
  const linkPath = (): string => {
    // if (type === 1) return `/${wordseed}`;
    // if (type === 2) return `/profile/${authorId}`;
    // if (type === 3) return `/feed/${postId}`;
    // if (type === 4) return `/feed/${postId}`;
    return "";
  };

  return (
    <Link href={linkPath()} className={style["alram-item"]}>
      <Date date={date} />
      <AlramContent type={type} wordseed="무지개" articleNum={3} />
    </Link>
  );
}

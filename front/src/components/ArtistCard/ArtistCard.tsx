"use client";
import { useState } from "react";
import { Icon } from "..";
import styles from "./ArtistCard.module.scss";
import Link from "next/link";

type ArtistCardProps = {
  userId: number;
  recvCnt: number;
  sendCnt: number;
  userName: string;
  userDecp: string;
  subscribed: boolean;
};

export default function ArtistCard({
  userId,
  userName,
  userDecp,
  recvCnt,
  sendCnt,
  subscribed,
}: ArtistCardProps) {
  const [isFollow, setIsFollow] = useState(subscribed);

  const followHandler = (e: any) => {
    e.stopPropagation();
    e.nativeEvent.preventDefault();
    setIsFollow(!isFollow);
    // 여기에 팔로우 팔로워 api 로직
  };

  const url = process.env.BASE_URL;

  return (
    <Link
      className={styles.container}
      href={`http://192.168.219.101:3000/profile/${userId}`}
    >
      <div className={styles["top-section"]}>
        <div className={styles["top-left-section"]}>
          <p className={styles["user-name"]}>{userName}</p>
          <div className={styles.follow}>
            <p>구독 {recvCnt}</p>
            <p>관심작가 {sendCnt}</p>
          </div>
        </div>
        <div className={styles.icon} onClick={followHandler}>
          <Icon
            iconName={isFollow ? "afterFollow" : "beforeFollow"}
            size={35}
          />
        </div>
      </div>
      <div className={styles["bottom-section"]}>
        <p>{userDecp}</p>
      </div>
    </Link>
  );
}

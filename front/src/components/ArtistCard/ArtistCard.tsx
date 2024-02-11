"use client";
import { useState } from "react";
import { Icon } from "..";
import styles from "./ArtistCard.module.scss";
import Link from "next/link";
import { formatNumber } from "@/utils/numberUtils";

type ArtistCardProps = {
  userId: number;
  userName: string;
  userDecp: string;
  recvCnt: number;
  sendCnt: number;
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

  return (
    <Link className={styles.container} href={`/profile/${userId}`}>
      <div className={styles["top-section"]}>
        <div className={styles["top-left-section"]}>
          <p className={styles["user-name"]}>{userName}</p>
          <div className={styles.follow}>
            <p>구독 {formatNumber(recvCnt)}</p>
            <p>관심작가 {formatNumber(sendCnt)}</p>
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

"use client";

import { Icon } from "..";
import styles from "./ArtistCard.module.scss";
import Link from "next/link";
import { formatNumber } from "@/utils/numberUtils";
import { useListFollow } from "@/api/user";
import React from "react";

type ArtistCardProps = {
  userId: number;
  userName: string;
  userDecp: string;
  recvCnt: number;
  sendCnt: number;
  subscribed: boolean;
};

export function ArtistCardMemo({
  userId,
  userName,
  userDecp,
  recvCnt,
  sendCnt,
  subscribed,
}: ArtistCardProps) {
  // 내 아이디
  const myId = 4;

  const followMutation = useListFollow(userId, "followUser");
  const unFollowMutation = useListFollow(userId, "unFollowUser");

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
        {myId === userId ? (
          ""
        ) : subscribed ? (
          <button
            className={styles.button}
            onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.preventDefault();
              unFollowMutation.mutate();
            }}
          >
            <Icon iconName="afterFollow" />
          </button>
        ) : (
          <button
            className={styles.button}
            onClick={(e) => {
              e.stopPropagation();
              e.nativeEvent.preventDefault();
              followMutation.mutate();
            }}
          >
            <Icon iconName="beforeFollow" />
          </button>
        )}
      </div>
      <div className={styles["bottom-section"]}>
        <p>{userDecp}</p>
      </div>
    </Link>
  );
}

export const ArtistCard = React.memo(ArtistCardMemo);

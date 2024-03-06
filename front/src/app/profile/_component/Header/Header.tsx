import styles from "./Header.module.scss";
import { Icon } from "@/components";
import Link from "next/link";
import { formatNumber } from "@/utils/numberUtils";
import { useFollow } from "@/api/user";

type UserProfileProps = {
  userId: number;
  userName: string;
  userDecp: string;
  recvCnt: number;
  sendCnt: number;
  subscribed: boolean;
};

export default function Header({
  userId,
  userName,
  userDecp,
  recvCnt,
  sendCnt,
  subscribed,
}: UserProfileProps) {
  // 내 아이디
  const myId = 4;

  const followMutation = useFollow(userId, "followUser");
  const unFollowMutation = useFollow(userId, "unFollowUser");

  return (
    <header className={styles.container}>
      <div className={styles["top-section"]}>
        <div className={styles["top-left-section"]}>
          <p className={styles.nickname}>{userName}</p>
          {/* 아직 세팅에서 내정보수정페이지 안만들어 져서 추후 수정해야됨 */}
          {myId === userId ? (
            <Link className={styles.link} href="/settings">
              <Icon iconName="profileEdit" />
            </Link>
          ) : subscribed ? (
            <button
              className={styles.button}
              onClick={() => {
                unFollowMutation.mutate();
              }}
            >
              <Icon iconName="afterFollow" />
            </button>
          ) : (
            <button
              className={styles.button}
              onClick={() => {
                followMutation.mutate();
              }}
            >
              <Icon iconName="beforeFollow" />
            </button>
          )}
        </div>
        <Link
          className={styles["top-right-section"]}
          href={`/follow/${userId}`}
        >
          <div>
            <p>{formatNumber(sendCnt)}</p>
            <p>관심 작가</p>
          </div>
          <div>
            <p>{formatNumber(recvCnt)}</p>
            <p>구독자</p>
          </div>
        </Link>
      </div>
      <div className={styles["bottom-section"]}>
        <div>
          <p className={styles["description-name"]}>소개</p>
          <p className={styles.description}>{userDecp}</p>
        </div>
      </div>
    </header>
  );
}

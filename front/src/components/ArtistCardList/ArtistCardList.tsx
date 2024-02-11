import { ArtistCard } from "..";
import styles from "./ArtistCardList.module.scss";

type ArtistCardProps = {
  userId: number;
  userName: string;
  userDecp: string;
  recvCnt: number;
  sendCnt: number;
  subscribed: boolean;
};

type ArtistCardListProps = {
  datas: ArtistCardProps[];
};

export default function ArtistCardList({ datas }: ArtistCardListProps) {
  return (
    <div className={styles.container}>
      {datas.map((data) => (
        <ArtistCard
          key={data.userId}
          userId={data.userId}
          userName={data.userName}
          userDecp={data.userDecp}
          recvCnt={data.recvCnt}
          sendCnt={data.sendCnt}
          subscribed={data.subscribed}
        />
      ))}
    </div>
  );
}

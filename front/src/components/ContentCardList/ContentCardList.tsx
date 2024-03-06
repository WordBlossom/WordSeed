// import { ContentCard } from "..";
// import styles from "./ContentCardList.module.scss";

// interface ContentCardProps {
//   postId: number;
//   type: "text" | "img" | "video" | "sound";
//   title: string;
//   content: string;
//   textAlign: "start" | "center" | "end";
//   userName: string;
//   url: string;
// }

// type ContentCardListProps = {
//   datas: ContentCardProps[];
// };

// export default function ContentCardList({ datas }: ContentCardListProps) {
//   return (
//     <div className={styles.container}>
//       {datas.map((data) => (
//         <ContentCard key={data.postId} {...data} />
//       ))}
//     </div>
//   );
// }
import React from "react";
import { ContentCard } from "..";
import styles from "./ContentCardList.module.scss";

interface ContentCardProps {
  postId: number;
  type: "text" | "img" | "video" | "sound";
  title: string;
  content: string;
  textAlign: "start" | "center" | "end";
  userName: string;
  url: string;
}

type ContentCardListProps = {
  datas: ContentCardProps[];
};

export const ContentCardList = React.memo(function ContentCardList({
  datas,
}: ContentCardListProps) {
  return (
    <div className={styles.container}>
      {datas.map((data) => (
        <ContentCard key={data.postId} {...data} />
      ))}
    </div>
  );
});

import useSearchFilterStateStore from "@/stores/search-filter";
import { ContentCard } from "..";
import styles from "./ContentCardList.module.scss";
import { FeedListDTO, FeedTypeEnum, UserFeedListDTO } from "@/api/feed/types";
import profileToggleStore from "@/stores/profile-toggle";
import { useFeedList } from "@/api/feed";

interface ContentCardProps {
  postId: number;
  type: "text" | "img" | "video" | "sound";
  title: string;
  content: string;
  textAlign: "start" | "center" | "end";
  userName: string;
  url: string;
}

const datas: ContentCardProps[] = [
  {
    postId: 1,
    type: "text",
    title: "자기 소개",
    content: "어설프어설프게 시작한 소개는\n 그렇게 나를 인식시킨다.",
    textAlign: "center",
    userName: "초아누리",
    url: "https://velog.velcdn.com/images/shrewslampe/post/b455111f-8921-4a48-908f-f5fea743d286/image.png",
  },
  {
    postId: 2,
    type: "img",
    title: "자기 소개",
    content: "어설프어설프게 시작한 소개는\n 그렇게 나를 인식시킨다.",
    textAlign: "center",
    userName: "초아누리",
    url: "https://velog.velcdn.com/images/shrewslampe/post/b455111f-8921-4a48-908f-f5fea743d286/image.png",
  },
  {
    postId: 3,
    type: "video",
    title: "자기 소개",
    content: "어설프어설프게 시작한 소개는\n 그렇게 나를 인식시킨다.",
    textAlign: "center",
    userName: "초아누리",
    url: "https://i2.ruliweb.net/ori/24/02/17/18db50369258db08.mp4",
  },
  {
    postId: 4,
    type: "video",
    title: "자기 소개",
    content: "어설프어설프게 시작한 소개는\n 그렇게 나를 인식시킨다.",
    textAlign: "center",
    userName: "초아누리",
    url: "https://i2.ruliweb.net/ori/24/02/15/18dab844b3f484f84.mp4",
  },
];

export default function ContentCardList({ userId }: { userId: number }) {
  const myId = 4;
  const isMe = myId === userId;

  const { selected } = profileToggleStore();
  const { text, paint, video, music, isLatest } = useSearchFilterStateStore();
  let postType = [
    text ? "TEXT" : null,
    paint ? "PAINT" : null,
    video ? "VIDEO" : null,
    music ? "MUSIC" : null,
  ]
    .filter((type) => type)
    .join(",");

  const feedListParams: FeedListDTO = {
    postType: postType,
    sort: isLatest ? "DATE_DSC" : "LIKE_DSC",
  };

  const userFeedListParams: UserFeedListDTO = {
    ...feedListParams,
    userId,
  };

  const props = {
    params: isMe ? feedListParams : userFeedListParams,
    type: isMe
      ? selected
        ? FeedTypeEnum.Bookmark
        : FeedTypeEnum.My
      : FeedTypeEnum.User,
  };

  const { data, status, fetchNextPage } = useFeedList(props);

  return (
    <>
      {status === "success" && !data.pages.length && <p>결과 없음</p>}
      {status === "success" && data.pages.length && (
        <div className={styles.container}>
          {data.pages.map((feedData) => (
            <ContentCard key={feedData.postId} {...feedData} />
          ))}
        </div>
      )}
    </>
  );
}

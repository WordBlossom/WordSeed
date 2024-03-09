import useSearchFilterStateStore from "@/stores/search-filter";
import { useInView } from "react-intersection-observer";
import { ContentCard } from "..";
import styles from "./ContentCardList.module.scss";
import { FeedListDTO, FeedTypeEnum, UserFeedListDTO } from "@/api/feed/types";
import profileToggleStore from "@/stores/profile-toggle";
import { useFeedList } from "@/api/feed";

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

  const [ref] = useInView({
    onChange: (inView) => {
      if (inView) fetchNextPage();
    },
  });

  return (
    <>
      {status === "success" && !data.pages.length && <p>결과 없음</p>}
      {status === "success" && data.pages.length && (
        <div className={styles.container}>
          {data.pages.map((feedData, idx) => (
            <div
              key={feedData.postId}
              ref={idx === data.pages.length - 5 ? ref : undefined}
            >
              <ContentCard key={feedData.postId} {...feedData} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

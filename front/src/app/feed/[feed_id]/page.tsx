import { FeedInterface } from "@/components";
import FeedContent from "@/components/feed/feed";
import style from "./feed.module.scss";

export default function Feed({ params }: { params: { feed_id: string } }) {
  const feedId = params.feed_id;
  return (
    <div className={style["feed-container"]}>
      <FeedContent />
      <FeedInterface />
    </div>
  );
}

import Button from "./Button";
import Icon from "@/components/Icon/Icon";
import { FeedDetail } from "@/api/feed/types";
import { useListBookMark } from "@/api/feed/hooks/post-bookmark";

type BookmarkButtonProps = {
  postId: FeedDetail["postId"];
  wordId: FeedDetail["wordId"];
  postType: FeedDetail["postType"];
  bookMarked: FeedDetail["bookMarked"];
};

export default function BookmarkButton({
  postId,
  wordId,
  postType,
  bookMarked,
}: BookmarkButtonProps) {
  const bookMarkMutation = useListBookMark({
    postId,
    wordId,
    postType,
    queryName: bookMarked ? "deleteBookMark" : "postBookMark",
  });

  const onClick = () => {
    bookMarkMutation.mutate();
  };

  return (
    <Button
      content={
        <Icon iconName={bookMarked ? "checkedBookmark" : "beforeBookmark"} />
      }
      onClick={onClick}
    />
  );
}

import Button from "./Button";
import Icon from "@/components/Icon/Icon";
import { FeedDetail } from "@/api/feed/types";
import { useListLike } from "@/api/feed/hooks/post-like";

type LikeButtonProps = {
  postId: FeedDetail["postId"];
  wordId: FeedDetail["wordId"];
  postType: FeedDetail["postType"];
  liked: FeedDetail["liked"];
};

export default function LikeButton({
  postId,
  wordId,
  postType,
  liked,
}: LikeButtonProps) {
  const likeMutation = useListLike({
    postId: postId,
    wordId: wordId,
    postType: postType,
    queryName: liked ? "deleteLike" : "postLike",
  });
  const onClick = () => {
    likeMutation.mutate();
  };

  return (
    <Button
      content={<Icon iconName={liked ? "afterLike" : "beforeLike"} />}
      onClick={onClick}
    />
  );
}

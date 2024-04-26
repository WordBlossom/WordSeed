import Button from "./Button";
import Icon from "@/components/Icon/Icon";
import { FeedDetail } from "@/api/feed/types";
import { useListLike } from "@/api/feed/hooks/post-like";

type LikeButtonProps = {
  postId: FeedDetail["postId"];
  wordId: FeedDetail["wordId"];
  postType: FeedDetail["postType"];
  liked: FeedDetail["liked"];
  type?: "detail" | "profile";
};

export default function LikeButton({
  postId,
  wordId,
  postType,
  liked,
  type,
}: LikeButtonProps) {
  const likeMutation = useListLike({
    postId,
    wordId,
    postType,
    queryName: liked ? "deleteLike" : "postLike",
    type,
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

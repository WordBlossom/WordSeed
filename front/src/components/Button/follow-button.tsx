import Button from "./Button";
import Icon from "@/components/Icon/Icon";
import { FeedDetail } from "@/api/feed/types";
import { useFeedListFollow } from "@/api/feed/hooks/post-follow";

type FollowButtonProps = {
  userId: FeedDetail["userId"];
  postId: FeedDetail["postId"];
  subscribed: FeedDetail["subscribed"];
};

export default function FollowButton({
  userId,
  postId,
  subscribed,
}: FollowButtonProps) {
  const followMutation = useFeedListFollow({
    userId,
    postId,
    queryName: subscribed ? "deleteFollow" : "postFollow",
  });

  const onClick = () => {
    followMutation.mutate();
  };

  return (
    <Button
      content={<Icon iconName={subscribed ? "afterFollow" : "beforeFollow"} />}
      onClick={onClick}
    />
  );
}

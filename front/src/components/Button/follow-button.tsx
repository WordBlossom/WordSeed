import Button from "./Button";
import Icon from "@/components/Icon/Icon";
import { FeedDetail } from "@/api/feed/types";
import { useFeedListFollow } from "@/api/feed/post-follow";

type FollowButtonProps = {
  userId: FeedDetail["userId"];
  subscribed: FeedDetail["subscribed"];
};

export default function FollowButton({
  userId,
  subscribed,
}: FollowButtonProps) {
  const followMutation = useFeedListFollow({
    userId: userId,
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

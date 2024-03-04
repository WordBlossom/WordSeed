import Button from "./Button";
import Icon from "@/components/Icon/Icon";

type LikeButtonProps = {
  isLiked: boolean;
};

export default function LikeButton({ isLiked }: LikeButtonProps) {
  const onClick = () => {
    // 좋아요 통신
  };

  return (
    <Button
      content={<Icon iconName={isLiked ? "afterLike" : "beforeLike"} />}
      onClick={onClick}
    />
  );
}

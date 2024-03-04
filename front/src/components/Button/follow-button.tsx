import Button from "./Button";
import Icon from "@/components/Icon/Icon";

type FollowButtonProps = {
  isFollow: boolean;
};

export default function FollowButton({ isFollow }: FollowButtonProps) {
  const onClick = () => {
    // follow 통신
  };

  return (
    <Button
      content={<Icon iconName={isFollow ? "afterFollow" : "beforeFollow"} />}
      onClick={onClick}
    />
  );
}

import Button from "./Button";
import Icon from "@/components/Icon/Icon";

type BookmarkButtonProps = {
  isBookMarked: boolean;
};

export default function BookmarkButton({ isBookMarked }: BookmarkButtonProps) {
  const onClick = () => {
    // bookmark 통신
  };

  return (
    <Button
      content={
        <Icon iconName={isBookMarked ? "checkedBookmark" : "beforeBookmark"} />
      }
      onClick={onClick}
    />
  );
}

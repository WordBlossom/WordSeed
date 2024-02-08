import Button from "./Button";
import Icon from "@/components/Icon/Icon";

export default function CreateFeedButton() {
  const onClick = () => {
    // create 페이지로 이동
  };

  return <Button content={<Icon iconName="add" />} onClick={onClick} />;
}

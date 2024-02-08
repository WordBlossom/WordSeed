import Button from "./Button";
import Icon from "@/components/Icon/Icon";

export default function BackButton() {
  const onClick = () => {
    // 뒤로 가기
  };

  return <Button content={<Icon iconName="leftArrow" />} onClick={onClick} />;
}

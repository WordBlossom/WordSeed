import Button from "./Button";
import Icon from "@/components/Icon/Icon";

export default function MenuButton() {
  const onClick = () => {
    // 사이드바 등장
  };

  return <Button content={<Icon iconName="menu" />} onClick={onClick} />;
}

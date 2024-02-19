import Button from "./Button";
import Icon from "@/components/Icon/Icon";

export default function SearchButton() {
  const onClick = () => {
    // 검색 api 요청
  };

  return <Button content={<Icon iconName="search" />} onClick={onClick} />;
}

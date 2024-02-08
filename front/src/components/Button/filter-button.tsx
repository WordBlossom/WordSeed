import Button from "./Button";
import Icon from "@/components/Icon/Icon";

export default function FilterButton() {
  const onClick = () => {
    // store filter active
  };

  return <Button content={<Icon iconName="filter" />} onClick={onClick} />;
}

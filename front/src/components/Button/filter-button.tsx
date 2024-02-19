import { Dispatch, SetStateAction } from "react";
import Button from "./Button";
import Icon from "@/components/Icon/Icon";

type FilterButtonProps = {
  isHidden: boolean;
  setIsHidden: Dispatch<SetStateAction<boolean>>;
};

export default function FilterButton({
  isHidden,
  setIsHidden,
}: FilterButtonProps) {
  const onClick = () => {
    setIsHidden((prev) => !prev);
  };

  return (
    <Button
      content={<Icon iconName={isHidden ? "filter" : "filterBlack"} />}
      onClick={onClick}
    />
  );
}

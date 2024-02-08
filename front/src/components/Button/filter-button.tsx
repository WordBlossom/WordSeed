import { Dispatch, SetStateAction } from "react";
import Button from "./Button";
import Icon from "@/components/Icon/Icon";

type FilterButtonProps = {
  setIsHidden: Dispatch<SetStateAction<boolean>>;
};

export default function FilterButton({ setIsHidden }: FilterButtonProps) {
  const onClick = () => {
    setIsHidden((prev) => !prev);
  };

  return <Button content={<Icon iconName="filter" />} onClick={onClick} />;
}

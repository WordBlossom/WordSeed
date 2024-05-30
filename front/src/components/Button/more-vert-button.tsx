import { Dispatch, SetStateAction } from "react";
import Button from "./Button";
import Icon from "@/components/Icon/Icon";

type MoreVertButtonProps = {
  setShowPopover: Dispatch<SetStateAction<boolean>>;
};

export default function MoreVertButton({
  setShowPopover,
}: MoreVertButtonProps) {
  const onClick = () => {
    setShowPopover((prev) => !prev);
  };

  return <Button content={<Icon iconName={"moreVert"} />} onClick={onClick} />;
}

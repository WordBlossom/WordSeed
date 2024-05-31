import Image from "next/image";

export type IconType =
  | "menu"
  | "search"
  | "add"
  | "addFile"
  | "artist"
  | "beforeBookmark"
  | "afterBookmark"
  | "checkedBookmark"
  | "filter"
  | "filterBlack"
  | "cancel"
  | "copy"
  | "copyBlack"
  | "leftArrow"
  | "rightArrow"
  | "beforeLike"
  | "afterLike"
  | "alignCenter"
  | "alignRight"
  | "alignLeft"
  | "beforeFollow"
  | "afterFollow"
  | "upDownArrow"
  | "comment"
  | "profileEdit"
  | "audioPlay"
  | "audioStop"
  | "sun"
  | "water";

interface Props {
  iconName: IconType;
  size?: number;
}

export default function Icon({ iconName, size = 35 }: Props) {
  const iconPath = `/icons/${iconName}.svg`;
  return (
    <Image
      src={iconPath}
      priority={true}
      alt={iconName}
      width={size}
      height={size}
      title={`Icon: ${iconName as string}`}
    />
  );
}

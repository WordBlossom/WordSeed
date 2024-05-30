import styles from "./feed-interface.module.scss";

type PopoverProps = {
  showPopover: boolean;
};

export default function Popover({ showPopover }: PopoverProps) {
  return (
    <div
      className={`${
        showPopover ? styles["popover-content"] : styles["hidden"]
      }`}
    >
      <li>수정</li>
      <li>삭제</li>
    </div>
  );
}

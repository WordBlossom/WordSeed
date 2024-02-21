"use client";

import styles from "./Button.module.scss";

type ButtonProps = {
  type?: "default" | "wide" | "small";
  content: string | React.ReactNode;
  isActive?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement>;
};
export default function Button({
  type = "default",
  content,
  isActive,
  onClick,
  onMouseDown,
}: ButtonProps) {
  const defaultType = `${styles.button} ${isActive && styles.active} ${
    typeof content === "string" && styles.text
  }`;
  const wideType = `${styles["button-wide"]} ${isActive && styles.active}`;
  const smallType = `${styles["button-small"]}`;

  const resType =
    type === "default" ? defaultType : type === "wide" ? wideType : smallType;
  return (
    <button className={resType} onMouseDown={onMouseDown} onClick={onClick}>
      {content}
    </button>
  );
}

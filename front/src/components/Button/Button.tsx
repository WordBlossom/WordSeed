"use client";

import styles from "./Button.module.scss";

type ButtonProps = {
  type?: "default" | "wide";
  content: string | React.ReactNode;
  isActive?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};
export default function Button({
  type = "default",
  content,
  isActive,
  onClick,
}: ButtonProps) {
  const defaultType = `${styles.button} ${isActive && styles.active} ${
    typeof content === "string" && styles.text
  }`;

  const wideType = `${styles["button-wide"]} ${isActive && styles.active}`;

  return (
    <button
      className={type === "default" ? defaultType : wideType}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

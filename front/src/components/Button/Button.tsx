"use client";

import styles from "./Button.module.scss";

type ButtonProps = {
  content: string | React.ReactNode;
  isActive?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};
export default function Button({ content, isActive, onClick }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${
        typeof content === "string" && isActive ? styles.active : ""
      }`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}

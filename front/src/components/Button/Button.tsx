"use client";

import styles from "./Button.module.scss";

// string 일 때,
// content : 버튼 텍스트
// isActive : store 상태값
// setIsActive : store 상태 변화 함수

// icon 일 때,
// content : icon 컴포넌트
// setIsActive : store 상태 변화 함수
type ButtonProps = {
  content: string | React.ReactNode;
  isActive?: boolean | undefined;
  setIsActive?: () => void;
};
export default function Button({
  content,
  isActive,
  setIsActive,
}: ButtonProps) {
  const handleClick = () => {
    // 상태 변화 함수가 있는 경우
    if (setIsActive) {
      setIsActive();
    }
    // 상태 변화 함수가 없는 경우, 다른 로직
  };

  return (
    <button
      className={`${styles.button} ${
        typeof content === "string" && isActive ? styles.active : ""
      }`}
      onClick={handleClick}
    >
      {content}
    </button>
  );
}

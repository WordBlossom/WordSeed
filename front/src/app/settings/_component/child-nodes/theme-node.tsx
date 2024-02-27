"use client";

import { Icon } from "@/components";
import style from "../settings.module.scss";

export default function ThemeNode() {
  const handleClick = () => {
    // 클릭 이벤트 처리
  };
  return (
    <div className={style["settings-content"]} onClick={handleClick}>
      <p>Light</p>
      <Icon iconName="rightArrow" />
    </div>
  );
}

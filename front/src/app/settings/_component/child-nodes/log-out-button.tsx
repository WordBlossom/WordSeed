"use client";

import { Icon } from "@/components";
import style from "../settings.module.scss";

export default function LogOutButton() {
  const handleClick = () => {
    // 클릭 이벤트 처리
  };
  return (
    <div className={style["logout"]} onClick={handleClick}>
      <span>로그아웃</span>
      <Icon iconName="rightArrow" />
    </div>
  );
}

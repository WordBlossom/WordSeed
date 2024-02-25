"use client";

import style from "./user-info.module.scss";
import Icon from "@/components/Icon/Icon";
import { Button } from "@/components";
export default function Withdrawal() {
  const onClick = () => {
    const isConfirmed = window.confirm(
      "회원탈퇴를 하시겠습니까?\n\n등록된 작품들이 영구히 삭제되고 복구되지 않습니다."
    );

    if (isConfirmed) {
      // 탈퇴 요청 api
    }
  };

  return (
    <div className={style["withdrawal"]}>
      <Icon iconName="rightArrow" size={25} />
      {/* <p>회원탈퇴</p> */}
      <Button content={"회원탈퇴"} onClick={onClick} />
    </div>
  );
}

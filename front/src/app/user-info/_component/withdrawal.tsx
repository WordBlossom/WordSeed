"use client";

import style from "./user-info.module.scss";
import Icon from "@/components/Icon/Icon";
import { Button } from "@/components";
import { useMutation } from "@tanstack/react-query";
import { userInfoQuery } from "@/api/user";

const message = {
  회원탈퇴:
    "회원탈퇴를 하시겠습니까?\n\n등록된 작품들이 영구히 삭제되고 복구되지 않습니다.",
  로그아웃: "로그아웃 하시겠습니까?",
};

export default function Withdrawal({
  type,
}: {
  type: "회원탈퇴" | "로그아웃";
}) {
  const { queryFn } = userInfoQuery.deleteUser();

  const deleteUser = useMutation({
    mutationFn: queryFn,
  });

  const onClick = () => {
    const isConfirmed = window.confirm(message[type]);

    if (isConfirmed) {
      // 탈퇴 요청 api
      if (type === "회원탈퇴") {
        deleteUser.mutate();
        console.log("탈퇴됨");
        // 탈퇴 후 앱 초기화면으로 보내는 로직
      }
    }
  };

  return (
    <div className={style["withdrawal"]}>
      <Icon iconName="rightArrow" size={25} />
      <Button content={type} onClick={onClick}></Button>
    </div>
  );
}

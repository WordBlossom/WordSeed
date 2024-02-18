"use client";

import Button from "./Button";
import Icon from "@/components/Icon/Icon";

export default function CommentButton() {
  // 팔로우 상태 임시로 useState 활용
  // API 연결 단계에서 react-query 활용 예정
  const onClick = () => {
    // 댓글창 on
  };

  return <Button content={<Icon iconName="comment" />} onClick={onClick} />;
}

"use client";
// 임시로 use Client 사용

import Button from "./Button";
import Icon from "@/components/Icon/Icon";
import { useState } from "react";

export default function BookmarkButton() {
  // 팔로우 상태 임시로 useState 활용
  // API 연결 단계에서 react-query 활용 예정
  const [isBookmarked, setIsBookmarked] = useState(false);
  const onClick = () => {
    setIsBookmarked((prev) => !prev);
    // 검색 api 요청
  };

  return (
    <Button
      content={
        <Icon iconName={isBookmarked ? "checkedBookmark" : "beforeBookmark"} />
      }
      onClick={onClick}
    />
  );
}

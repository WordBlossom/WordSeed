"use client";

import Button from "./Button";
import Icon from "@/components/Icon/Icon";
import useCommentToggleStateStore from "@/stores/comment-toggle";
import { FeedDetail } from "@/api/feed/types";

type CommentButtonProps = {
  postId: FeedDetail["postId"];
};

export default function CommentButton({ postId }: CommentButtonProps) {
  const { setCommentToggle, setCommentPostId } = useCommentToggleStateStore();
  // 팔로우 상태 임시로 useState 활용
  // API 연결 단계에서 react-query 활용 예정
  const onClick = () => {
    setCommentToggle(true);
    setCommentPostId(postId);
  };

  return <Button content={<Icon iconName="comment" />} onClick={onClick} />;
}

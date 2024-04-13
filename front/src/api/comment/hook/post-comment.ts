import { MutableRefObject } from "react";
import { useMutation } from "@tanstack/react-query";
import { getQueryClient, MutationConfig } from "@/lib/react-query";
import { postComment } from "@/api/comment/api";
import { PostCommentDTO } from "../types";

type usePostCommentOptions = {
  postId: PostCommentDTO["postId"];
  commentContainerRef: MutableRefObject<HTMLDivElement | null>;
  config?: MutationConfig<typeof postComment>;
};

export const usePostComment = ({
  postId,
  commentContainerRef,
}: usePostCommentOptions) => {
  const queryClient = getQueryClient();
  const queryKey = ["commentList", { postId: postId }];

  return useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
      commentContainerRef.current?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  });
};

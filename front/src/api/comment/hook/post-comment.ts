import { useMutation } from "@tanstack/react-query";
import { getQueryClient, MutationConfig } from "@/lib/react-query";
import { postComment } from "@/api/comment/api";
import { PostCommentDTO } from "../types";

type usePostCommentOptions = {
  postId: PostCommentDTO["postId"];
  config?: MutationConfig<typeof postComment>;
};

export const usePostComment = ({ postId }: usePostCommentOptions) => {
  const queryClient = getQueryClient();
  const queryKey = ["commentList", { postId: postId }];

  return useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });
};

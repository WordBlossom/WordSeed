import { useMutation, InfiniteData } from "@tanstack/react-query";
import { getQueryClient, MutationConfig } from "@/lib/react-query";
import { deleteComment } from "@/api/comment/api";
import {
  PostCommentDTO,
  DeleteCommentDTO,
  CommentList,
  InfiniteQueryUpdater,
} from "@/api/comment/types";

type useDeleteCommentOptions = {
  commentId: DeleteCommentDTO["commentId"];
  postId: PostCommentDTO["postId"];
  config?: MutationConfig<typeof deleteComment>;
};

export function useDeleteComment({
  commentId,
  postId,
}: useDeleteCommentOptions) {
  const queryClient = getQueryClient();
  const queryKey = ["commentList", { postId: postId }];

  const newData: InfiniteQueryUpdater<CommentList> = (previousData) => {
    const updatedPages = previousData?.pages.map((page) => {
      const updatedComments = page.comments.filter((comment) => {
        return comment.commentId !== commentId;
      });
      return { ...page, comments: updatedComments };
    });

    const updatedCommentList = {
      pages: updatedPages,
      pageParams: previousData?.pageParams,
    } as InfiniteData<CommentList>;
    return updatedCommentList;
  };

  return useMutation({
    mutationFn: () => deleteComment({ commentId }),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousCommentList =
        queryClient.getQueryData<InfiniteData<CommentList>>(queryKey);

      queryClient.setQueryData<InfiniteData<CommentList>>(queryKey, newData);

      return { previousCommentList };
    },
    onError: (error, newData, context) => {
      queryClient.setQueryData(queryKey, context?.previousCommentList);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKey,
      });
    },
  });
}

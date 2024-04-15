import { axios } from "@/lib/axios";
import { DeleteCommentDTO } from "@/api/comment/types";

export const deleteComment = async ({ commentId }: DeleteCommentDTO) => {
  return await axios.delete(`/post/comment`, { data: { commentId } });
};

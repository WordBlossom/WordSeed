import { axios } from "@/lib/axios";
import { PostCommentDTO, PostComment } from "@/api/comment/types";

export const postComment = async ({
  postId,
  content,
}: PostCommentDTO): Promise<PostComment> => {
  return await axios.post(`/post/comment`, { postId, content });
};

import { axios } from "@/lib/axios";
import { CommentListDTO, CommentList } from "@/api/comment/types";

export async function getCommentList(
  params: CommentListDTO
): Promise<CommentList> {
  return axios.get(`/post/comment`, { params });
}

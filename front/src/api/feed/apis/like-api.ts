import { axios } from "@/lib/axios";
import { BookMarkAndLikeDTO, Like } from "@/api/feed/types";

export const postLike = async ({
  postId,
}: BookMarkAndLikeDTO): Promise<Like> => {
  return await axios.post(`/post/like`, { postId });
};

export const deleteLike = async ({
  postId,
}: BookMarkAndLikeDTO): Promise<Like> => {
  return await axios.delete(`/post/like`, { data: { postId } });
};

export const likeQuery = {
  postLike: (postId: number) => ({
    queryKey: ["postLike", { postId }],
    queryFn: () => postLike({ postId }),
  }),
  deleteLike: (postId: number) => ({
    queryKey: ["deleteLike", { postId }],
    queryFn: () => deleteLike({ postId }),
  }),
};

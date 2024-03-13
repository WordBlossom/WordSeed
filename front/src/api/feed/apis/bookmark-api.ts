import { axios } from "@/lib/axios";
import { BookMarkAndLikeDTO, BookMark } from "@/api/feed/types";

export const postBookMark = async ({
  postId,
}: BookMarkAndLikeDTO): Promise<BookMark> => {
  return await axios.post(`/post/mark`, { postId });
};

export const deleteBookMark = async ({
  postId,
}: BookMarkAndLikeDTO): Promise<BookMark> => {
  return await axios.delete(`/post/mark`, { data: { postId } });
};

export const bookMarkQuery = {
  postBookMark: (postId: number) => ({
    queryKey: ["postBookMark", { postId }],
    queryFn: () => postBookMark({ postId }),
  }),
  deleteBookMark: (postId: number) => ({
    queryKey: ["deleteBookMark", { postId }],
    queryFn: () => deleteBookMark({ postId }),
  }),
};

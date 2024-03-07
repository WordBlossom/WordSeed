import { axios } from "@/lib/axios";
import { BookMarkDTO, BookMark } from "./types";

export const postBookMark = async ({
  postId,
}: BookMarkDTO): Promise<BookMark> => {
  return await axios.post(`/post/mark`, { postId });
};

export const deleteBookMark = async ({
  postId,
}: BookMarkDTO): Promise<BookMark> => {
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

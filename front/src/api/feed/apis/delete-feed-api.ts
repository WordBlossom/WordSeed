import { axios } from "@/lib/axios";
import { DeleteFeedDTO } from "../types";

export const deleteFeed = async ({ postId }: DeleteFeedDTO) => {
  return await axios.delete("/post", { data: { postId } });
};

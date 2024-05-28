import { axios } from "@/lib/axios";
import { PostFeedDTO } from "@/api/feed/types";

export const postFeed = async (params: PostFeedDTO) => {
  return await axios.post("/post", {
    ...params,
  });
};

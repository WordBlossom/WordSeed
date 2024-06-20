import { axios } from "@/lib/axios";
import { PutFeedDTO } from "@/api/feed/types";

export const putFeed = async (params: PutFeedDTO) => {
  return await axios.put("/post", {
    ...params,
  });
};

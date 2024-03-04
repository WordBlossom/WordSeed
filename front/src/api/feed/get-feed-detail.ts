import { axios } from "@/lib/axios";
import { FeedDetail } from "./types";

export async function getFeedDetail(feedId: number): Promise<FeedDetail> {
  return await axios.get(`/post/detail?postId=${feedId}`);
}

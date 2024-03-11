import { DEFAULT_POST_TYPE, DEFAULT_SORT } from "@/api/feed";
import { FeedListDTO } from "@/api/feed/types";

export const myParams: FeedListDTO = {
  postType: DEFAULT_POST_TYPE,
  sort: DEFAULT_SORT,
};

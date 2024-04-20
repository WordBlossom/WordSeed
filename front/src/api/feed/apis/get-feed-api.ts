import { axios } from "@/lib/axios";
import {
  FeedListDTO,
  MainFeedListDTO,
  FeedList,
  UserFeedListDTO,
  FeedType,
  FeedListQueryType,
} from "@/api/feed/types";

export async function getWordFeedList(
  params: MainFeedListDTO
): Promise<FeedList> {
  return axios.get(`/post/list/word`, { params });
}

export async function getFollowFeedList(
  params: FeedListDTO
): Promise<FeedList> {
  return axios.get(`/post/list/subs`, { params });
}

export async function getMyFeedList(params: FeedListDTO): Promise<FeedList> {
  return axios.get(`/post/list/self`, { params });
}

export async function getBookmarkFeedList(
  params: FeedListDTO
): Promise<FeedList> {
  return axios.get(`/post/list/book-mark`, { params });
}

export async function getUserFeedList(
  params: UserFeedListDTO
): Promise<FeedList> {
  return axios.get(`/post/list/user`, { params });
}

// getQueriesData를 사용할 때, queryKey에 type을 개별 string으로만 넣으면 원하는 쿼리에 접근하지 못함
// Object로 넣으면 접근 가능
const postType = (params: MainFeedListDTO) => {
  const types: { [key: string]: boolean } = {};
  params.postType.split(",").forEach((type) => (types[type] = true));
  return types;
};

export const feedListQuery: {
  [K in FeedType]: () => FeedListQueryType<K>;
} = {
  word: () => ({
    queryKey: (params: MainFeedListDTO) => [
      "wordFeedList",
      params,
      postType(params),
    ],
    queryFn: (params: MainFeedListDTO) => getWordFeedList(params),
  }),
  follow: () => ({
    queryKey: (params: FeedListDTO) => ["followFeedList", params],
    queryFn: (params: FeedListDTO) => getFollowFeedList(params),
  }),
  my: () => ({
    queryKey: (params: FeedListDTO) => ["myFeedList", params],
    queryFn: (params: FeedListDTO) => getMyFeedList(params),
  }),
  bookmark: () => ({
    queryKey: (params: FeedListDTO) => ["bookmarkFeedList", params],
    queryFn: (params: FeedListDTO) => getBookmarkFeedList(params),
  }),
  user: () => ({
    queryKey: (params: UserFeedListDTO) => ["userFeedList", params],
    queryFn: (params: UserFeedListDTO) => getUserFeedList(params),
  }),
};

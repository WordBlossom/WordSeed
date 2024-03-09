import { axios } from "@/lib/axios";
import {
  FeedListDTO,
  WordFeedListDTO,
  FeedList,
  UserFeedListDTO,
  FeedType,
  FeedListQueryType,
} from "./types";

export async function getWordFeedList(
  params: WordFeedListDTO
): Promise<FeedList> {
  return axios.get(`/post/list/word`, { params });
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

export const feedListQuery: {
  [K in FeedType]: () => FeedListQueryType<K>;
} = {
  word: () => ({
    queryKey: (params: WordFeedListDTO) => ["wordFeedList", params],
    queryFn: (params: WordFeedListDTO) => getWordFeedList(params),
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

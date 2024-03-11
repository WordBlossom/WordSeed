export type FeedType = "word" | "my" | "bookmark" | "user";

export enum FeedTypeEnum {
  Word = "word",
  My = "my",
  Bookmark = "bookmark",
  User = "user",
}

export type ParamsByType<T extends FeedType> = T extends "word"
  ? WordFeedListDTO
  : T extends "my" | "bookmark"
  ? FeedListDTO
  : T extends "user"
  ? UserFeedListDTO
  : never;

export type QueryFnType<T extends FeedType> = (
  params: ParamsByType<T>
) => Promise<FeedList>;

export type FeedListQueryType<T extends FeedType> = {
  queryKey: (params: ParamsByType<T>) => (string | ParamsByType<T>)[];
  queryFn: QueryFnType<T>;
};

export interface FeedListDTO {
  postType: string;
  sort: "DATE_ASC" | "DATE_DSC" | "LIKE_ASC" | "LIKE_DSC";
  page?: number;
  size?: number;
}

export interface WordFeedListDTO extends FeedListDTO {
  wordId: number;
}

export interface UserFeedListDTO extends FeedListDTO {
  userId: number;
}

export type FeedDetail = {
  postId: number;
  userId: number;
  userName: string;
  postAlign: "LEFT" | "CENTER" | "RIGHT";
  postType: "TEXT" | "PAINT" | "MUSIC" | "VIDEO";
  PostVisibility: "PUBLIC" | "PRIVATE";
  content: string;
  url: string;
  likedCnt: number;
  bookMarkCnt: number;
  commentCnt: number;
  liked: boolean;
  bookMarked: boolean;
  subscribed: boolean;
  wordId: number;
  word: string;
  createdAt: string;
  updatedAt: string;
};

export type FeedList = {
  posts: FeedDetail[];
};

export type BookMarkDTO = {
  postId: number;
};

export type BookMark = {
  bookMarkId: number;
  userId: number;
  postId: number;
  createAt: string;
  updateAt: string;
};

import { Updater, InfiniteData } from "@tanstack/react-query";
import { DEFAULT_POST_TYPE } from "./hooks/get-feed-list";

export type PostType =
  | "TEXT"
  | "PAINT"
  | "MUSIC"
  | "VIDEO"
  | typeof DEFAULT_POST_TYPE;

export type FeedType = "word" | "my" | "bookmark" | "user" | "follow";

export enum FeedTypeEnum {
  Word = "word",
  My = "my",
  Bookmark = "bookmark",
  User = "user",
}

export type ParamsByType<T extends FeedType> = T extends "word"
  ? MainFeedListDTO
  : T extends "my" | "bookmark" | "follow"
  ? FeedListDTO
  : T extends "user"
  ? UserFeedListDTO
  : never;

export type QueryFnType<T extends FeedType> = (
  params: ParamsByType<T>
) => Promise<FeedList>;

export type FeedListQueryType<T extends FeedType> = {
  queryKey: (params: ParamsByType<T>) => (string | ParamsByType<T> | Object)[];
  queryFn: QueryFnType<T>;
};

export interface FeedListDTO {
  postType: PostType;
  sort: "DATE_ASC" | "DATE_DSC" | "LIKE_ASC" | "LIKE_DSC";
  page?: number;
  size?: number;
}

export interface MainFeedListDTO extends FeedListDTO {
  wordId?: number;
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

export type BookMarkAndLikeDTO = {
  postId: number;
};

export type FollowDTO = {
  userId: number;
};

interface BookMarkAndLike {
  userId: number;
  postId: number;
  createAt: string;
  updateAt: string;
}

export interface BookMark extends BookMarkAndLike {
  bookMarkId: number;
}

export interface Like extends BookMarkAndLike {
  postLikedId: number;
}

export type InfiniteQueriesUpdater<Data> = Updater<
  InfiniteData<Data, unknown> | undefined,
  InfiniteData<Data, unknown> | undefined
>;

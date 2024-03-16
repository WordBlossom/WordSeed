import { Updater, InfiniteData } from "@tanstack/react-query";

export enum FollowType {
  Send = "SEND",
  Recv = "RECV",
}

export type AuthorListDTO = {
  query: string;
  page?: number;
  size?: number;
};

export type FollowAuthorListDTO = {
  userId: number;
  type: "SEND" | "RECV";
  page?: number;
  size?: number;
};

export type Author = {
  userId: number;
  userName: string;
  sendCnt: number;
  recvCnt: number;
  userDecp: string;
  subscribed: boolean;
};

export type AuthorList = {
  users: Author[];
};

export type QueryFnType<T> = (params: T) => Promise<AuthorList>;

export type InfiniteQueriesUpdater<Data> = Updater<
  InfiniteData<Data, unknown> | undefined,
  InfiniteData<Data, unknown> | undefined
>;

export type AuthorListDTO = {
  query: string;
  page?: number;
  size?: number;
};

export type FollowAuthorDTO = {
  userId: number;
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

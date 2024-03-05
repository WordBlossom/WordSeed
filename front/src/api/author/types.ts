export type AuthorListDTO = {
  query: string;
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

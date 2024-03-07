export type FeedListDTO = {
  wordId: number;
  postType: string;
  sort: "DATE_ASC" | "DATE_DSC" | "LIKE_ASC" | "LIKE_DSC";
  page?: number;
  size?: number;
};

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
  wordId: Number;
  word: String;
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
  bookMarkId: Number;
  userId: Number;
  postId: Number;
  createAt: string;
  updateAt: string;
};

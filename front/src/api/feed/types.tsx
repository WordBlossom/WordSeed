export type FeedDetail = {
  postId: number;
  userId: number;
  userName: string;
  postAlign: "LEST" | "CENTER" | "RIGHT"; // 02.19 수정 (type -> postType)
  postType: "TEXT" | "PAINT" | "MUSIC" | "VIDEO"; // 02.19 추가
  PostVisibility: "PUBLIC" | "PRIVATE"; // 02.19 추가
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

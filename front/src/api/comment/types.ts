export type CommentListDTO = {
  postId: number;
  page?: number;
  size?: number;
};

export type Comment = {
  commentId: number;
  userId: number;
  postId: number;
  userName: string;
  content: string;
  createdAt: string;
};

export type CommentList = {
  comments: Comment[];
};

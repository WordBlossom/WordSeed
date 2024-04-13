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

export type PostCommentDTO = {
  postId: number;
  content: string;
};

export type PostComment = Omit<Comment, "userName">;

export type DeleteCommentDTO = {
  commentId: number;
};

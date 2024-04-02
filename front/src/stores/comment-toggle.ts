import { create } from "zustand";

type CommentToggleState = {
  commentToggle: boolean;
  commentPostId: number;
};

type CommentToggleStateStore = {
  setCommentToggle: (onOff: boolean) => void;
  setCommentPostId: (postId: number) => void;
};

export const initialState: CommentToggleState = {
  commentToggle: false,
  commentPostId: 0,
};

const useCommentToggleStateStore = create<
  CommentToggleState & CommentToggleStateStore
>((set) => ({
  commentToggle: false,
  commentPostId: 0,
  setCommentToggle: (onOff) => set(() => ({ commentToggle: onOff })),
  setCommentPostId: (postId) => set(() => ({ commentPostId: postId })),
}));

export default useCommentToggleStateStore;

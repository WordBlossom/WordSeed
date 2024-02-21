import { create } from "zustand";

type CommentToggleState = {
  commentToggle: boolean;
};

type CommentToggleStateStore = {
  setCommentToggle: (onOff: boolean) => void;
};

export const initialState: CommentToggleState = {
  commentToggle: false,
};

const useCommentToggleStateStore = create<
  CommentToggleState & CommentToggleStateStore
>((set) => ({
  commentToggle: true,
  setCommentToggle: (onOff) => set(() => ({ commentToggle: onOff })),
}));

export default useCommentToggleStateStore;

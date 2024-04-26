import { FeedDetail } from "@/api/feed/types";
import { create } from "zustand";

type FeedDetailStateStore = {
  data: FeedDetail;
  setFeedDetail: (data: FeedDetail) => void;
  setStateClear: () => void;
};

export const initialState: FeedDetail = {
  postId: 0,
  userId: 0,
  userName: "",
  postAlign: "LEFT",
  postType: "TEXT",
  PostVisibility: "PUBLIC",
  content: "",
  url: "",
  likedCnt: 0,
  bookMarkCnt: 0,
  commentCnt: 0,
  liked: false,
  bookMarked: false,
  subscribed: false,
  wordId: 0,
  word: "",
  createdAt: "",
  updatedAt: "",
};

const useFeedDetailStateStore = create<FeedDetailStateStore>((set) => ({
  data: initialState,
  setFeedDetail: (data) => set({ data: data }),
  setStateClear: () => set({ data: initialState }),
}));

export default useFeedDetailStateStore;

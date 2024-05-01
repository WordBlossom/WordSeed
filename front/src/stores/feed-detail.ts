import { FeedDetail } from "@/api/feed/types";
import { create } from "zustand";

interface FeedDetailStateStore extends FeedDetail {
  setFeedDetail: (data: FeedDetail) => void;
  setBookMarked: (flag: boolean) => void;
  setLiked: (flag: boolean) => void;
  setSubscribed: (flag: boolean) => void;
  setStateClear: () => void;
}

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
  ...initialState,
  setFeedDetail: (data) => set({ ...data }),
  setBookMarked: (flag) => set({ bookMarked: flag }),
  setLiked: (flag) => set({ liked: flag }),
  setSubscribed: (flag) => set({ subscribed: flag }),
  setStateClear: () => set({ ...initialState }),
}));

export default useFeedDetailStateStore;

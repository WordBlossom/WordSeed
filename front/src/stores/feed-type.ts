import { FeedType } from "@/api/feed/types";
import { create } from "zustand";

type FeedTypeStateStore = {
  type: FeedType;
  detail: boolean;
  setFeedType: (type: FeedType) => void;
  IsDetail: (flag: boolean) => void;
};

const useFeedTypeStateStore = create<FeedTypeStateStore>((set) => ({
  type: "user",
  detail: false,
  setFeedType: (type) => set({ type }),
  IsDetail: (flag) => set({ detail: flag }),
}));

export default useFeedTypeStateStore;

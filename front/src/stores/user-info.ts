import { create } from "zustand";

type UserInfoState = {
  authorName: string;
  selfIntroduction: string;
};

type UserInfoStateStore = UserInfoState & {
  setAuthorName: (content: string) => void;
  setSelfIntroduction: (content: string) => void;
  setStateClear: () => void;
};

export const initialState: UserInfoState = {
  authorName: "",
  selfIntroduction: "",
};

const useUserInfoStateStore = create<UserInfoStateStore>((set) => ({
  authorName: "비 내리는 호남선",
  selfIntroduction:
    "동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산",
  setAuthorName: (content) => set({ authorName: content }),
  setSelfIntroduction: (content) => set({ selfIntroduction: content }),
  setStateClear: () => set({ ...initialState }),
}));

export default useUserInfoStateStore;

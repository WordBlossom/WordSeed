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
  authorName: "",
  selfIntroduction: "",
  setAuthorName: (content) => set({ authorName: content }),
  setSelfIntroduction: (content) => set({ selfIntroduction: content }),
  setStateClear: () => set({ ...initialState }),
}));

export default useUserInfoStateStore;

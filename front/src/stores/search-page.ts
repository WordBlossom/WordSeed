import { create } from "zustand";

interface SearchPageState {
  isWordseed: boolean;
  searchKeyword: string;
}

interface SearchPageStateStore extends SearchPageState {
  setWordseed: () => void;
  setAuthor: () => void;
  setSearchKeyword: (keyword: string) => void;
  reset: () => void;
}

const initialState: SearchPageState = {
  isWordseed: true,
  searchKeyword: "",
};

const useSearchPageStateStore = create<SearchPageStateStore>((set) => ({
  isWordseed: true,
  searchKeyword: "",
  setWordseed: () =>
    set((state) => {
      if (state.isWordseed) return state;
      return { isWordseed: true, searchKeyword: "" };
    }),
  setAuthor: () =>
    set((state) => {
      if (!state.isWordseed) return state;
      return { isWordseed: false, searchKeyword: "" };
    }),
  setSearchKeyword: (keyword) => set({ searchKeyword: keyword }),
  reset: () => set(initialState),
}));

export default useSearchPageStateStore;

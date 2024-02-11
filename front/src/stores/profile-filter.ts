import { create } from "zustand";

type FilterButtonHiddenState = {
  isFilterButtonHidden: boolean;
};

type FilterButtonHiddenStateStore = {
  setIsFilterButtonHidden: (inView: boolean) => void;
  clearFilterButtonHiddenState: () => void;
};

export const initialState: FilterButtonHiddenState = {
  isFilterButtonHidden: true,
};

const useFilterButtonHiddenStateStore = create<
  FilterButtonHiddenState & FilterButtonHiddenStateStore
>((set) => ({
  isFilterButtonHidden: true,
  setIsFilterButtonHidden: (inView) => set({ isFilterButtonHidden: inView }),
  clearFilterButtonHiddenState: () => set(initialState),
}));

export default useFilterButtonHiddenStateStore;

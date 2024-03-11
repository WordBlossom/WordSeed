import { create } from "zustand";

type SearchFilterState = {
  selectedType: "TEXT" | "PAINT" | "VIDEO" | "MUSIC" | null;
  isLatest: boolean;
};

type SearchFilterStateStore = {
  setIsActive: (clickedType: SearchFilterState["selectedType"]) => void;
  setIsLatest: () => void;
  clearSearchFilterState: () => void;
};

export const initialState: SearchFilterState = {
  selectedType: null,
  isLatest: true,
};

const useSearchFilterStateStore = create<
  SearchFilterState & SearchFilterStateStore
>((set) => ({
  selectedType: null,
  isLatest: true,
  setIsActive: (clickedType) =>
    set((state) => ({
      selectedType: state.selectedType === clickedType ? null : clickedType,
    })),
  setIsLatest: () => set((state) => ({ isLatest: !state.isLatest })),
  clearSearchFilterState: () => set(initialState),
}));

export default useSearchFilterStateStore;

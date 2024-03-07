import { create } from "zustand";

type SearchFilterState = {
  text: boolean;
  paint: boolean;
  video: boolean;
  music: boolean;
  isLatest: boolean;
};

type SearchFilterStateStore = {
  setIsActive: (clickedType: keyof SearchFilterState) => void;
  clearSearchFilterState: () => void;
};

export const initialState: SearchFilterState = {
  text: true,
  paint: true,
  video: true,
  music: true,
  isLatest: true,
};

const postTypes: (keyof SearchFilterState)[] = [
  "text",
  "paint",
  "video",
  "music",
];

const useSearchFilterStateStore = create<
  SearchFilterState & SearchFilterStateStore
>((set) => ({
  text: true,
  paint: true,
  video: true,
  music: true,
  isLatest: true,
  setIsActive: (clickedType: keyof SearchFilterState) =>
    set((state) => {
      const otherTypesBoolean: boolean[] = [];
      postTypes.forEach((type) => {
        if (type === clickedType) return;
        otherTypesBoolean.push(state[type]);
      });
      if (otherTypesBoolean.every((el) => el === false) && state[clickedType]) {
        return state;
      }
      return { [clickedType]: !state[clickedType] };
    }),
  clearSearchFilterState: () => set(initialState),
}));

export default useSearchFilterStateStore;

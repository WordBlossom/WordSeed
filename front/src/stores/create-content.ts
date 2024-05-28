import { create } from "zustand";

interface CreateContentProps {
  wordseed: string;
  type: "TEXT" | "PAINT" | "MUSIC" | "VIDEO";
  textAlign: "LEFT" | "CENTER" | "RIGHT";
  textContent: string;
  file: File | null;
  postVisibility: "PUBLIC" | "PRIVATE";
}

interface CreateContentState extends CreateContentProps {
  setWordseed: (wordseed: string) => void;
  setType: (type: CreateContentProps["type"]) => void;
  setTextAlign: (align: CreateContentProps["textAlign"]) => void;
  setTextContent: (content: string) => void;
  setFile: (paint: File) => void;
  cleanFile: () => void;
  cleanCreateContentState: () => void;
}

const initialState: CreateContentProps = {
  wordseed: "",
  type: "TEXT",
  textAlign: "LEFT",
  textContent: "",
  file: null,
  postVisibility: "PUBLIC",
};

const createContentStore = create<CreateContentState>((set) => ({
  ...initialState,
  setWordseed: (wordseed) => set({ wordseed }),
  setType: (type) => set({ type }),
  setTextAlign: (align) => set({ textAlign: align }),
  setTextContent: (content) => set({ textContent: content }),
  setFile: (file) => set({ file }),
  cleanFile: () => set({ file: null }),
  cleanCreateContentState: () => set(initialState),
}));
export default createContentStore;

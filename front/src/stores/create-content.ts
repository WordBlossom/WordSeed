import { create } from "zustand";

interface CreateContentProps {
  wordseed: string;
  type: "text" | "paint" | "video" | "music";
  textAlign: "alignLeft" | "alignCenter" | "alignRight";
  textContent: string;
  file: File | null;
}

interface CreateContentState extends CreateContentProps {
  setWordseed: (wordseed: string) => void;
  setType: (type: "text" | "paint" | "video" | "music") => void;
  setTextAlign: (align: "alignLeft" | "alignCenter" | "alignRight") => void;
  setTextContent: (content: string) => void;
  setFile: (paint: File) => void;
  cleanFile: () => void;
  cleanCreateContentState: () => void;
}

const initialState: CreateContentProps = {
  wordseed: "",
  type: "text",
  textAlign: "alignLeft",
  textContent: "",
  file: null,
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

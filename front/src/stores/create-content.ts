import { create } from "zustand";

interface CreateContentProps {
  wordseed: string;
  wordId: number | null;
  type: "TEXT" | "PAINT" | "MUSIC" | "VIDEO";
  textAlign: "LEFT" | "CENTER" | "RIGHT";
  textContent: string;
  file: File | null;
  previewUrl: string;
  postVisibility: "PUBLIC" | "PRIVATE";
}

interface CreateContentState extends CreateContentProps {
  setWordseed: (wordseed: CreateContentProps["wordseed"]) => void;
  setWordId: (wordId: CreateContentProps["wordId"]) => void;
  setType: (type: CreateContentProps["type"]) => void;
  setTextAlign: (align: CreateContentProps["textAlign"]) => void;
  setTextContent: (content: CreateContentProps["textContent"]) => void;
  setFile: (file: File) => void;
  setPreviewUrl: (previewUrl: CreateContentProps["previewUrl"]) => void;
  cleanFile: () => void;
  cleanCreateContentState: () => void;
}

const initialState: CreateContentProps = {
  wordseed: "",
  wordId: null,
  type: "TEXT",
  textAlign: "LEFT",
  textContent: "",
  file: null,
  previewUrl: "",
  postVisibility: "PUBLIC",
};

const createContentStore = create<CreateContentState>((set) => ({
  ...initialState,
  setWordseed: (wordseed) => set({ wordseed }),
  setWordId: (wordId) => set({ wordId }),
  setType: (type) => set({ type }),
  setTextAlign: (align) => set({ textAlign: align }),
  setTextContent: (content) => set({ textContent: content }),
  setFile: (file) => {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (): void => {
      if (typeof reader.result === "string") {
        set({ file, previewUrl: reader.result });
      }
    };
  },
  setPreviewUrl: (previewUrl) => set({ previewUrl }),
  cleanFile: () => set({ file: null }),
  cleanCreateContentState: () => set(initialState),
}));
export default createContentStore;

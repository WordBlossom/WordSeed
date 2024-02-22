import { create } from "zustand";

interface CreateContentProps {
  type: "text" | "paint" | "video" | "music";
  textAlign: "alignLeft" | "alignCenter" | "alignRight";
  textContent: string;
  mediaFile: File | null;
}

interface CreateContentState extends CreateContentProps {
  setTextAlign: (align: "alignLeft" | "alignCenter" | "alignRight") => void;
  setTextContent: (content: string) => void;
  setMideaFile: (file: File) => void;
  cleanCreateContentState: () => void;
}

const initialState: CreateContentProps = {
  type: "text",
  textAlign: "alignLeft",
  textContent: "",
  mediaFile: null,
};

const createContentStore = create<CreateContentState>((set) => ({
  ...initialState,
  setTextAlign: (align) => set({ textAlign: align }),
  setTextContent: (content) => set({ textContent: content }),
  setMideaFile: (file: File) => set({ mediaFile: file }),
  cleanCreateContentState: () => set(initialState),
}));
export default createContentStore;

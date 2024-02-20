import { create } from "zustand";

interface ToggleProps {
  selected: boolean;
}

interface ToggleState extends ToggleProps {
  setSelected: (name: boolean) => void;
}

const profileToggleStore = create<ToggleState>((set) => ({
  selected: false,
  setSelected: (name) => set({ selected: name }),
}));
export default profileToggleStore;

import { create } from "zustand";

interface UseLanguageModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useLanguageModal = create<UseLanguageModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

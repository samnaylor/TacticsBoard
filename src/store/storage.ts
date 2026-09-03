import type { StateStorage } from "zustand/middleware";

export const deduplicatingStorage: StateStorage = {
  getItem: (name) => localStorage.getItem(name),
  setItem: (name, value) => {
    if (localStorage.getItem(name) !== value) {
      localStorage.setItem(name, value);
    }
  },
  removeItem: (name) => localStorage.removeItem(name),
};

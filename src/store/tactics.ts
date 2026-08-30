import { create } from "zustand"
import { type Screen } from "../data";

interface TacticsState {
  screen: Screen;

  setScreen: (screen: Screen) => void;
};

export const useTacticsState = create<TacticsState>(set => ({
  screen: "pitch",

  setScreen: (screen: Screen) => set({ screen }),
}));

import { create } from "zustand"
import { type Formation, type Screen } from "../data";

interface TacticsState {
  screen: Screen;
  formation: Formation;

  setScreen: (screen: Screen) => void;
  setFormation: (formation: Formation) => void;
};

export const useTacticsState = create<TacticsState>(set => ({
  screen: "pitch",
  formation: "4-4-2",

  setScreen: (screen: Screen) => set({ screen }),
  setFormation: (formation: Formation) => set({ formation }),
}));

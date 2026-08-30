import { create } from "zustand"
import { defaultNames, type Formation, type Screen } from "../data";

interface TacticsState {
  screen: Screen;
  formation: Formation;
  names: string[];

  setScreen: (screen: Screen) => void;
  setFormation: (formation: Formation) => void;
  setNames: (names: string[]) => void;
};

export const useTacticsState = create<TacticsState>(set => ({
  screen: "pitch",
  formation: "4-4-2",
  names: defaultNames,

  setScreen: (screen: Screen) => set({ screen }),
  setFormation: (formation: Formation) => set({ formation }),
  setNames: (names: string[]) => set({ names }),
}));

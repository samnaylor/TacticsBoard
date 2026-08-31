import { create } from "zustand";
import { defaultNames, formations, type Formation, type Screen } from "../data";

interface TacticsState {
  screen: Screen;
  formation: Formation;
  selectedSlot: number | null;
  editingPlayer: number | null;

  bench: number;
  names: string[];
  layout: { x: number, y: number, number: number; }[];

  changeName: (slot: number, newName: string) => void;
  changeFormation: (formation: Formation) => void;
  swapNames: (slot0: number, slot1: number) => void;

  decreaseBench: () => void;
  increaseBench: () => void;

  handlePlayerClick: (slot: number) => void;

  setScreen: (screen: Screen) => void;
  setFormation: (formation: Formation) => void;
  setNames: (names: string[]) => void;
  setSelectedSlot: (selectedSlot: number | null) => void;
  setEditingPlayer: (editingPlayer: number | null) => void;
};

export const useTacticsState = create<TacticsState>(set => ({
  screen: "pitch",
  formation: "4-4-2",
  selectedSlot: null,
  editingPlayer: null,

  bench: 3,
  names: defaultNames,
  layout: formations["4-4-2"],

  changeName: (slot: number, newName: string) => set(state => ({
    names: state.names.map((name, i) => i === slot ? newName : name)
  })),

  changeFormation: (formation: Formation) => set(() => {
    return { formation: formation, layout: formations[formation] };
  }),

  swapNames: (slot0: number, slot1: number) => set(state => {
    const names = [...state.names];

    [names[slot0], names[slot1]] = [names[slot1], names[slot0]];

    return { names };
  }),

  increaseBench: () => set(state => ({
    bench: Math.min(5, state.bench + 1)
  })),

  decreaseBench: () => set(state => ({
    bench: Math.max(0, state.bench - 1)
  })),

  handlePlayerClick: (slot: number) => set(state => {
    switch (state.selectedSlot) {
      case null:
        return { selectedSlot: slot };

      case slot:
        break;

      default:
        state.swapNames(state.selectedSlot, slot);
    }

    return { selectedSlot: null };
  }),

  setScreen: (screen: Screen) => set({ screen }),
  setFormation: (formation: Formation) => set({ formation }),
  setNames: (names: string[]) => set({ names }),
  setSelectedSlot: (selectedSlot: number | null) => set({ selectedSlot }),
  setEditingPlayer: (editingPlayer: number | null) => set({ editingPlayer }),
}));

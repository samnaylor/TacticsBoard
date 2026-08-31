import { create } from "zustand";
import { defaultNames, type Formation, type Screen } from "../data";
import { persist } from "zustand/middleware";

interface TacticsState {
  screen: Screen;
  formation: Formation;
  selectedSlot: number | null;
  editingPlayer: number | null;

  bench: number;
  names: string[];

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

const storageKey = "tactics-save";

export const useTacticsState = create<TacticsState>()(
  persist(
    (set) => ({
      screen: "pitch",
      formation: "4-4-2",
      selectedSlot: null,
      editingPlayer: null,

      bench: 3,
      names: defaultNames,

      changeName: (slot, newName) =>
        set((state) => ({
          names: state.names.map((name, i) =>
            i === slot ? newName : name
          ),
        })),

      changeFormation: (formation) =>
        set({ formation }),

      swapNames: (slot0, slot1) =>
        set((state) => {
          const names = [...state.names];

          [names[slot0], names[slot1]] = [
            names[slot1],
            names[slot0],
          ];

          return { names };
        }),

      increaseBench: () =>
        set((state) => ({
          bench: Math.min(5, state.bench + 1),
        })),

      decreaseBench: () =>
        set((state) => ({
          bench: Math.max(0, state.bench - 1),
        })),

      handlePlayerClick: (slot) =>
        set((state) => {
          if (state.selectedSlot === null) {
            return { selectedSlot: slot };
          }

          if (state.selectedSlot === slot) {
            return { selectedSlot: null };
          }

          const names = [...state.names];

          [names[state.selectedSlot], names[slot]] = [
            names[slot],
            names[state.selectedSlot],
          ];

          return {
            names,
            selectedSlot: null,
          };
        }),

      setScreen: (screen) => set({ screen }),
      setFormation: (formation) => set({ formation }),
      setNames: (names) => set({ names }),
      setSelectedSlot: (selectedSlot) => set({ selectedSlot }),
      setEditingPlayer: (editingPlayer) => set({ editingPlayer }),
    }),
    {
      name: storageKey,

      partialize: (state) => ({
        bench: state.bench,
        formation: state.formation,
        names: state.names,
      }),
    }
  )
);
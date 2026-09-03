import { create } from "zustand";
import { defaultNames, formations } from "../data";
import { persist } from "zustand/middleware";
import type { Formation, ColourScheme, FormationSlot, Screen } from "../types";

interface TacticsState {
  dndEnabled: boolean;
  screen: Screen;
  formation: Formation;
  selectedSlot: number | null;
  editingPlayer: number | null;
  colourScheme: ColourScheme;

  benchCount: number;
  names: { name: string; modified: boolean }[];
  layout: FormationSlot[];

  toggleDnd: () => void;
  changeName: (slot: number, newName: string) => void;
  changeFormation: (formation: Formation) => void;
  swapNames: (slot0: number, slot1: number) => void;
  movePlayerPosition: (
    slot: number,
    percentx: number,
    percenty: number,
  ) => void;

  decreaseBench: () => void;
  increaseBench: () => void;

  handlePlayerClick: (slot: number) => void;
  resetNames: () => void;

  gotoPitch: () => void;
  gotoPlayers: () => void;

  setSelectedSlot: (selectedSlot: number | null) => void;
  setEditingPlayer: (editingPlayer: number | null) => void;

  toggleColourScheme: () => void;
}

const storageKey = "tactics-save";

export const useTacticsState = create<TacticsState>()(
  persist(
    (set) => ({
      dndEnabled: true,
      screen: "pitch",
      formation: "4-4-2",
      selectedSlot: null,
      editingPlayer: null,
      colourScheme: "home",

      benchCount: 3,
      names: defaultNames.map((name) => ({ name, modified: false })),
      layout: formations["4-4-2"],

      toggleDnd: () => set((state) => ({ dndEnabled: !state.dndEnabled })),

      changeName: (slot, newName) =>
        set((state) => ({
          names: state.names.map(({ name, modified }, i) =>
            i === slot ? { name: newName, modified: true } : { name, modified },
          ),
        })),

      changeFormation: (formation) =>
        set({ formation, layout: formations[formation] }),

      swapNames: (slot0, slot1) =>
        set((state) => {
          const names = [...state.names];

          [names[slot0], names[slot1]] = [names[slot1], names[slot0]];

          return { names };
        }),

      movePlayerPosition: (slot: number, percentx: number, percenty: number) =>
        set((state) => ({
          layout: state.layout.map((position, index) =>
            index === slot
              ? {
                  ...position,
                  x: Math.max(2, Math.min(98, position.x + percentx)),
                  y: Math.max(2, Math.min(98, position.y + percenty)),
                }
              : position,
          ),
        })),

      increaseBench: () =>
        set((state) => ({
          benchCount: Math.min(5, state.benchCount + 1),
        })),

      decreaseBench: () =>
        set((state) => ({
          benchCount: Math.max(0, state.benchCount - 1),
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

      resetNames: () =>
        set({
          names: defaultNames.map((name) => ({ name, modified: false })),
        }),

      gotoPitch: () => set({ screen: "pitch" }),
      gotoPlayers: () => set({ screen: "players" }),

      setSelectedSlot: (selectedSlot) => set({ selectedSlot }),
      setEditingPlayer: (editingPlayer) => set({ editingPlayer }),

      toggleColourScheme: () =>
        set((state) => ({
          colourScheme: state.colourScheme === "home" ? "away" : "home",
        })),
    }),
    {
      name: storageKey,

      partialize: (state) => ({
        bench: state.benchCount,
        formation: state.formation,
        names: state.names,
        layout: state.layout,
        colourScheme: state.colourScheme,
        dndEnabled: state.dndEnabled,
      }),
    },
  ),
);

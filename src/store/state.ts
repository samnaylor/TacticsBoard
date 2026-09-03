import { create } from "zustand";
import {
  defaultNames,
  formations,
  MAX_BENCH_COUNT,
  PITCH_COUNT,
} from "../data";
import { persist } from "zustand/middleware";
import type { Formation, Screen } from "../types";
import {
  createDefaultPersistedState,
  PERSISTENCE_VERSION,
  type PersistedState,
} from "./persistedState";

interface State extends PersistedState {
  screen: Screen;
  selectedSlot: number | null;
  editingPlayer: number | null;

  renamePlayer: (slot: number, newName: string) => void;
  changeFormation: (formation: Formation) => void;
  swapNames: (slot0: number, slot1: number) => void;
  movePlayerPosition: (
    slot: number,
    percentx: number,
    percenty: number,
  ) => void;
  addSubstitute: () => void;
  removeSubstitute: (slot: number) => void;

  toggleDragDrop: () => void;
  toggleColourScheme: () => void;

  handlePlayerClick: (slot: number) => void;

  resetNames: () => void;
  resetLayout: () => void;
  resetAll: () => void;

  setScreen: (screen: Screen) => void;
  setSelectedSlot: (selectedSlot: number | null) => void;
  setEditingPlayer: (editingPlayer: number | null) => void;
}

const storageKey = "tactics-save";

export const createInitialState = () => ({
  ...createDefaultPersistedState(),
  screen: "pitch" as const,
  selectedSlot: null,
  editingPlayer: null,
});

export const useTacticsState = create<State>()(
  persist(
    (set) => ({
      ...createInitialState(),

      renamePlayer: (slot, newName) =>
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

      addSubstitute: () =>
        set((state) => ({
          benchCount: Math.min(MAX_BENCH_COUNT, state.benchCount + 1),
        })),

      removeSubstitute: (slot) =>
        set((state) => {
          const firstSub = PITCH_COUNT;
          const visibleEnd = PITCH_COUNT + state.benchCount;

          if (slot < firstSub || slot >= visibleEnd) {
            return state;
          }

          const names = [...state.names];
          const [removed] = names.splice(slot, 1);

          names.splice(visibleEnd - 1, 0, removed!);

          return { names, benchCount: state.benchCount - 1 };
        }),

      toggleDragDrop: () =>
        set((state) => ({ dragDropEnabled: !state.dragDropEnabled })),

      toggleColourScheme: () =>
        set((state) => ({
          colourScheme: state.colourScheme === "home" ? "away" : "home",
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
        set({ names: defaultNames.map((name) => ({ name, modified: false })) }),

      resetLayout: () =>
        set((state) => ({ layout: formations[state.formation] })),

      resetAll: () => set(createInitialState()),

      setScreen: (screen) => set({ screen }),

      setSelectedSlot: (selectedSlot) => set({ selectedSlot }),

      setEditingPlayer: (editingPlayer) => set({ editingPlayer }),
    }),
    {
      name: storageKey,
      version: PERSISTENCE_VERSION,
      partialize: (state) => ({
        formation: state.formation,
        names: state.names,
        layout: state.layout,
        benchCount: state.benchCount,
        colourScheme: state.colourScheme,
        dragDropEnabled: state.dragDropEnabled,
      }),
    },
  ),
);

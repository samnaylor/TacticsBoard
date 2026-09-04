import { create } from "zustand";
import { formations, MAX_BENCH_COUNT, PITCH_COUNT, SQUAD_SIZE } from "../data";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Formation, PlayerInteraction, Screen } from "../types";
import {
  createDefaultPersistedState,
  PERSISTENCE_VERSION,
  type PersistedState,
} from "./persistedState";
import { deduplicatingStorage } from "./storage";
import type { SharedState } from "./sharedState";
import type { ToastItem } from "../components/Toast";

export interface State extends PersistedState {
  screen: Screen;
  toasts: ToastItem[];
  playerInteraction: PlayerInteraction;

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

  selectOrSwapPlayer: (slot: number) => void;
  clearPlayerInteraction: () => void;
  openPlayerEditor: (slot: number) => void;
  closePlayerEditor: () => void;

  resetNames: () => void;
  resetLayout: () => void;
  resetAll: () => void;

  setScreen: (screen: Screen) => void;

  loadSharedState: (sharedState: SharedState) => void;

  addToast: (message: string, duration: number) => void;
  removeToast: (id: string) => void;
}

const storageKey = "tactics-save";

export const createInitialState = () => ({
  ...createDefaultPersistedState(),
  screen: "pitch" as const,
  toasts: [],
  playerInteraction: { type: "idle" } as const,
});

export const useTacticsState = create<State>()(
  persist(
    (set) => ({
      ...createInitialState(),

      renamePlayer: (slot, newName) =>
        set((state) => {
          if (
            slot < 0 ||
            slot >= SQUAD_SIZE ||
            state.customNames[slot] === newName
          ) {
            return state;
          }

          const customNames = [...state.customNames];
          customNames[slot] = newName;

          return { customNames };
        }),

      changeFormation: (formation) =>
        set({
          formation,
          customPositions: null,
          playerInteraction: { type: "idle" },
        }),

      swapNames: (slot0, slot1) =>
        set((state) => {
          const customNames = [...state.customNames];

          [customNames[slot0], customNames[slot1]] = [
            customNames[slot1],
            customNames[slot0],
          ];

          return { customNames };
        }),

      movePlayerPosition: (slot, percentx, percenty) =>
        set((state) => {
          if (slot < 0 || slot >= PITCH_COUNT) {
            return state;
          }

          const customPositions = (
            state.customPositions ?? formations[state.formation]
          ).map(({ x, y }) => ({ x, y }));
          const current = customPositions[slot];

          customPositions[slot] = {
            x: Math.max(2, Math.min(98, current.x + percentx)),
            y: Math.max(2, Math.min(98, current.y + percenty)),
          };

          return { customPositions };
        }),

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

          const customNames = [...state.customNames];
          const [removed] = customNames.splice(slot, 1);

          customNames.splice(visibleEnd - 1, 0, removed ?? null);

          return {
            customNames,
            benchCount: state.benchCount - 1,
            playerInteraction: { type: "idle" },
          };
        }),

      toggleDragDrop: () =>
        set((state) => ({ dragDropEnabled: !state.dragDropEnabled })),

      toggleColourScheme: () =>
        set((state) => ({
          colourScheme: state.colourScheme === "home" ? "away" : "home",
        })),

      selectOrSwapPlayer: (slot) =>
        set((state) => {
          if (slot < 0 || slot >= SQUAD_SIZE) {
            return state;
          }

          if (state.playerInteraction.type !== "selected") {
            return { playerInteraction: { type: "selected", slot } };
          }

          if (state.playerInteraction.slot === slot) {
            return { playerInteraction: { type: "idle" } };
          }

          const customNames = [...state.customNames];
          const selectedSlot = state.playerInteraction.slot;

          [customNames[selectedSlot], customNames[slot]] = [
            customNames[slot],
            customNames[selectedSlot],
          ];

          return {
            customNames,
            playerInteraction: { type: "idle" },
          };
        }),

      clearPlayerInteraction: () =>
        set({ playerInteraction: { type: "idle" } }),

      openPlayerEditor: (slot) =>
        set(
          slot >= 0 && slot < SQUAD_SIZE
            ? { playerInteraction: { type: "editing", slot } }
            : { playerInteraction: { type: "idle" } },
        ),

      closePlayerEditor: () => set({ playerInteraction: { type: "idle" } }),

      resetNames: () =>
        set({
          customNames: Array<string | null>(SQUAD_SIZE).fill(null),
          playerInteraction: { type: "idle" },
        }),

      resetLayout: () => set({ customPositions: null }),

      resetAll: () => set(createInitialState()),

      setScreen: (screen) =>
        set({ screen, playerInteraction: { type: "idle" } }),

      loadSharedState: (sharedState) =>
        set({
          formation: sharedState.formation,
          customNames: sharedState.customNames,
          customPositions: sharedState.customPositions,
          benchCount: sharedState.benchCount,
          playerInteraction: { type: "idle" },
        }),

      addToast: (message, duration) =>
        set((state) => {
          const id = crypto.randomUUID();
          const toasts = [...state.toasts, { id, message, duration }];

          return { toasts };
        }),

      removeToast: (id) =>
        set((state) => ({
          toasts: state.toasts.filter((toast) => toast.id !== id),
        })),
    }),
    {
      name: storageKey,
      version: PERSISTENCE_VERSION,
      storage: createJSONStorage(() => deduplicatingStorage),
      partialize: (state) => ({
        formation: state.formation,
        customNames: state.customNames,
        customPositions: state.customPositions,
        benchCount: state.benchCount,
        colourScheme: state.colourScheme,
        dragDropEnabled: state.dragDropEnabled,
      }),
      migrate: createDefaultPersistedState,
    },
  ),
);

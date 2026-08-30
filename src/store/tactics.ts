import { create } from "zustand"
import { defaultNames, defaultPlayers, type Formation, type Screen } from "../data";

interface TacticsState {
  screen: Screen;
  formation: Formation;
  names: string[];
  players: number[];
  selectedSlot: string | null;
  editingPlayer: number | null;

  setScreen: (screen: Screen) => void;
  setFormation: (formation: Formation) => void;
  setNames: (names: string[]) => void;
  setPlayers: (players: number[]) => void;
  setSelectedSlot: (selectedSlot: string | null) => void;
  setEditingPlayer: (editingPlayer: number | null) => void;
};

export const useTacticsState = create<TacticsState>(set => ({
  screen: "pitch",
  formation: "4-4-2",
  names: defaultNames,
  players: defaultPlayers,
  selectedSlot: null,
  editingPlayer: null,

  setScreen: (screen: Screen) => set({ screen }),
  setFormation: (formation: Formation) => set({ formation }),
  setNames: (names: string[]) => set({ names }),
  setPlayers: (players: number[]) => set({ players }),
  setSelectedSlot: (selectedSlot: string | null) => set({ selectedSlot }),
  setEditingPlayer: (editingPlayer: number | null) => set({ editingPlayer }),
}));

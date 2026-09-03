import type { formations } from "./data";

export type Screen = "pitch" | "players";

export type ColourScheme = "home" | "away";

export interface KitColours {
  main: string;
  border: string;
}

export interface Position {
  x: number;
  y: number;
}

export type FormationSlot = {
  x: number;
  y: number;
  number: number;
};

export type Formation = keyof typeof formations;

import { SQUAD_SIZE, version } from "../data";
import type { ColourScheme, Formation, Position } from "../types";

export const PERSISTENCE_VERSION = version
  .split(".")
  .reduce((encoded, part) => encoded * 1_000 + Number.parseInt(part, 10), 0);

export interface PersistedState {
  formation: Formation;
  customNames: (string | null)[];
  customPositions: Position[] | null;
  benchCount: number;
  colourScheme: ColourScheme;
  dragDropEnabled: boolean;
}

export const createDefaultPersistedState = (): PersistedState => ({
  formation: "4-4-2",
  customNames: Array<string | null>(SQUAD_SIZE).fill(null),
  customPositions: null,
  benchCount: 3,
  colourScheme: "home",
  dragDropEnabled: true,
});

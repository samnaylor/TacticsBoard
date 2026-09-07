import { SQUAD_SIZE, version } from "../data";
import type { ColourScheme, Formation, Position, SavedSquad } from "../types";

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

  savedSquads: SavedSquad[];
  activeSquadId: string | null;
}

export const createDefaultPersistedState = (): PersistedState => ({
  formation: "4-4-2",
  customNames: Array<string | null>(SQUAD_SIZE).fill(null),
  customPositions: null,
  benchCount: 3,
  colourScheme: "home",
  dragDropEnabled: true,
  savedSquads: [],
  activeSquadId: null,
});

export const migratePersistedState = (
  persistedState: unknown,
): PersistedState => {
  const defaults = createDefaultPersistedState();

  if (!persistedState || typeof persistedState !== "object") {
    return defaults;
  }

  const stored = persistedState as Partial<PersistedState>;
  const savedSquads = Array.isArray(stored.savedSquads)
    ? stored.savedSquads
    : defaults.savedSquads;
  const activeSquadId =
    typeof stored.activeSquadId === "string" &&
    savedSquads.some((squad) => squad.id === stored.activeSquadId)
      ? stored.activeSquadId
      : null;

  return {
    ...defaults,
    ...stored,
    savedSquads,
    activeSquadId,
  };
};

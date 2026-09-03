import { defaultNames, formations } from "../data";
import type { ColourScheme, Formation, FormationSlot } from "../types";

export const PERSISTENCE_VERSION = 1;

export interface PersistedState {
  formation: Formation;
  names: { name: string; modified: boolean }[];
  layout: FormationSlot[];
  benchCount: number;
  colourScheme: ColourScheme;
  dragDropEnabled: boolean;
}

export const createDefaultPersistedState = (): PersistedState => ({
  formation: "4-4-2",
  names: defaultNames.map((name) => ({ name, modified: false })),
  layout: formations["4-4-2"],
  benchCount: 3,
  colourScheme: "home",
  dragDropEnabled: true,
});

import type { Formation, Position } from "../types";

export interface SharedState {
  formation: Formation;
  customNames: (string | null)[];
  customPositions: Position[] | null;
  benchCount: number;
}

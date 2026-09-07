import type { SavedSquad } from "../types";

export const MAX_SQUAD_TITLE_LENGTH = 60;

export type SquadContent = Pick<
  SavedSquad,
  "formation" | "customNames" | "customPositions" | "benchCount"
>;

export const normaliseSquadTitle = (title: string) =>
  title.trim().slice(0, MAX_SQUAD_TITLE_LENGTH);

export const createSquadCopyTitle = (title: string) => {
  const suffix = " copy";
  const availableLength = MAX_SQUAD_TITLE_LENGTH - suffix.length;

  return `${title.slice(0, availableLength).trimEnd()}${suffix}`;
};

export const copySquadContent = (source: SquadContent): SquadContent => ({
  formation: source.formation,
  customNames: [...source.customNames],
  customPositions: source.customPositions
    ? source.customPositions.map(({ x, y }) => ({ x, y }))
    : null,
  benchCount: source.benchCount,
});

export const hasSameSquadContent = (left: SquadContent, right: SquadContent) =>
  left.formation === right.formation &&
  left.benchCount === right.benchCount &&
  left.customNames.length === right.customNames.length &&
  left.customNames.every((name, index) => name === right.customNames[index]) &&
  left.customPositions?.length === right.customPositions?.length &&
  (left.customPositions === null ||
    left.customPositions.every(
      (position, index) =>
        position.x === right.customPositions?.[index]?.x &&
        position.y === right.customPositions?.[index]?.y,
    ));

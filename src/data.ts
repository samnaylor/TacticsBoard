export const version = "0.0.14";

export type Screen = "pitch" | "players";

export type FormationSlot = {
  x: number;
  y: number;
  number: number;
};

export const formation_442: FormationSlot[] = [
  { x: 50, y: 80, number: 1 },  // GK
  { x: 15, y: 65, number: 3 },  // LB
  { x: 38, y: 65, number: 4 },  // CB
  { x: 62, y: 65, number: 5 },  // CB
  { x: 85, y: 65, number: 2 },  // RB
  { x: 15, y: 45, number: 11 }, // LM
  { x: 38, y: 45, number: 6 },  // CM
  { x: 62, y: 45, number: 8 },  // CM
  { x: 85, y: 45, number: 7 },  // RM
  { x: 38, y: 25, number: 9 },  // ST
  { x: 62, y: 25, number: 10 }, // ST
];

export const formation_4231: FormationSlot[] = [
  { x: 50, y: 80, number: 1 },  // GK
  { x: 15, y: 65, number: 3 },  // LB
  { x: 38, y: 65, number: 4 },  // CB
  { x: 62, y: 65, number: 5 },  // CB
  { x: 85, y: 65, number: 2 },  // RB
  { x: 38, y: 50, number: 6 },  // DM
  { x: 62, y: 50, number: 8 },  // DM
  { x: 15, y: 35, number: 11 }, // LW
  { x: 50, y: 35, number: 10 }, // ST
  { x: 85, y: 35, number: 7 },  // RW
  { x: 50, y: 20, number: 9 },  // ST
];

export const formation_352: FormationSlot[] = [
  { x: 50, y: 80, number: 1 },  // GK
  { x: 25, y: 67, number: 4 },  // CB
  { x: 50, y: 67, number: 5 },  // CB
  { x: 75, y: 67, number: 6 },  // CB
  { x: 15, y: 55, number: 3 },  // LWB
  { x: 85, y: 55, number: 2 },  // RWB
  { x: 32, y: 45, number: 8 },  // DM
  { x: 68, y: 45, number: 7 }, // DM
  { x: 50, y: 35, number: 10 }, // AM
  { x: 38, y: 20, number: 11 },  // ST
  { x: 62, y: 20, number: 9 },  // ST
];

export const formation_433_DM: FormationSlot[] = [
  { x: 50, y: 80, number: 1 },  // GK
  { x: 15, y: 65, number: 3 },  // LB
  { x: 38, y: 65, number: 4 },  // CB
  { x: 62, y: 65, number: 5 },  // CB
  { x: 85, y: 65, number: 2 },  // RB
  { x: 25, y: 25, number: 11 }, // LW
  { x: 50, y: 50, number: 6 },  // DM
  { x: 35, y: 40, number: 8 },  // CM
  { x: 75, y: 25, number: 7 },  // RW
  { x: 50, y: 20, number: 9 },  // ST
  { x: 65, y: 40, number: 10 }, // CM
];

export const formation_433_AM: FormationSlot[] = [
  { x: 50, y: 80, number: 1 },  // GK
  { x: 15, y: 65, number: 3 },  // LB
  { x: 38, y: 65, number: 4 },  // CB
  { x: 62, y: 65, number: 5 },  // CB
  { x: 85, y: 65, number: 2 },  // RB
  { x: 25, y: 25, number: 11 }, // LW
  { x: 35, y: 50, number: 6 },  // DM
  { x: 65, y: 50, number: 8 },  // CM
  { x: 75, y: 25, number: 7 },  // RW
  { x: 50, y: 20, number: 9 },  // ST
  { x: 50, y: 38, number: 10 }, // CM
];

export const formations = {
  "4-4-2": formation_442,
  "4-2-3-1": formation_4231,
  "3-5-2": formation_352,
  "4-3-3 (DM)": formation_433_DM,
  "4-3-3 (AM)": formation_433_AM,
};

export type Formation = keyof typeof formations;

export const defaultNames = [
  "Player 1",
  "Player 2",
  "Player 3",
  "Player 4",
  "Player 5",
  "Player 6",
  "Player 7",
  "Player 8",
  "Player 9",
  "Player 10",
  "Player 11",
  "Player 12",
  "Player 13",
  "Player 14",
  "Player 15",
  "Player 16",
];

import { DragDropProvider } from "@dnd-kit/react";
import { useState } from "react";
import Bench from "./Bench";
import Header from "./Header";
import PitchMarkings from "./PitchMarkings";
import Player from "./Player";
import { defaultPlayers, formations } from "../data";

interface Props {
  names: string[];
  onPlayers: () => void;
  onExport: () => void;
}

// TODO: state - formation changes when we come back from the players name screen

const Pitch = ({ names, onPlayers, onExport }: Props) => {
  const [players, setPlayers] = useState(defaultPlayers);
  const [formation, setFormation] = useState<"4-4-2" | "4-2-3-1">("4-4-2");

  const getName = (playerNumber: number) => {
    return names[playerNumber - 1] ?? "";
  };

  const getSlotIndex = (slotId: string) => {
    if (slotId.startsWith("pitch-")) {
      return Number(slotId.replace("pitch-", ""));
    }

    if (slotId.startsWith("bench-")) {
      return 11 + Number(slotId.replace("bench-", ""));
    }

    return -1;
  };

  const resetFormation = () => {
    setPlayers(defaultPlayers);
  };

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;

        const { source, target } = event.operation;

        if (!target || source?.id === target.id) {
          return;
        }

        const from = getSlotIndex(String(source!.id));
        const to = getSlotIndex(String(target.id));

        if (from === -1 || to === -1) {
          return;
        }

        setPlayers((current) => {
          const next = [...current];

          [next[from], next[to]] = [
            next[to],
            next[from],
          ];

          return next;
        });
      }}
    >
      <Header
        formation={formation}
        onPlayers={onPlayers}
        onReset={resetFormation}
        onExport={onExport}
        setFormation={setFormation}
      />

      <main className="mx-auto flex w-full max-w-190 flex-col items-center gap-5 px-3 py-4 sm:px-5">
        <div
          id="formation-export"
          className="w-full max-w-130 py-2"
        >
          <div className="relative aspect-2/3 w-full overflow-hidden rounded-2xl bg-[#1e4d3a] shadow-[0_12px_40px_rgba(0,0,0,.35)]">
            <div className="pointer-events-none absolute inset-0 z-1 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,.07),transparent_35%)]" />

            <PitchMarkings />

            {formations[formation].map((slot, index) => {
              const player = players[index];

              return (
                <Player
                  key={slot.number}
                  id={slot.number}
                  slotId={`pitch-${index}`}
                  name={getName(player)}
                  position={slot}
                />
              );
            })}
          </div>

          <div className="mt-3 w-full">
            <Bench
              players={players.slice(11)}
              setPlayers={setPlayers}
              getName={getName}
            />
          </div>
        </div>
      </main>
    </DragDropProvider>
  );
};

export default Pitch;
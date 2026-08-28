import { DragDropProvider } from "@dnd-kit/react";
import React, { useState } from "react";
import Bench from "./Bench";
import PitchHeader from "./PitchHeader";
import PitchMarkings from "./PitchMarkings";
import Player from "./Player";
import { defaultPlayers, formations, type Formation } from "../data";

interface Props {
  names: string[];
  formation: Formation;

  onPlayers: () => void;
  onExport: () => void;

  setFormation: React.Dispatch<React.SetStateAction<Formation>>;
}

const Pitch = ({ names, formation, onPlayers, onExport, setFormation }: Props) => {
  const [players, setPlayers] = useState(defaultPlayers);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const swapPlayers = (fromSlot: string, toSlot: string) => {
    const from = getSlotIndex(fromSlot);
    const to = getSlotIndex(toSlot);

    if (from === -1 || to === -1) {
      return;
    }

    setPlayers(current => {
      const next = [...current];

      [next[from], next[to]] = [next[to], next[from]];

      return next;
    });
  };

  const handlePlayerClick = (slotId: string) => {
    console.log(`clicked on ${slotId}`);

    switch (selectedSlot) {
      case null:
        setSelectedSlot(slotId);
        break;

      case slotId:
        setSelectedSlot(null);
        break;

      default:
        setSelectedSlot(null);
        swapPlayers(selectedSlot, slotId);
    }
  };

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

        swapPlayers(String(source!.id), String(target.id));
      }}
    >

      <div className="flex min-h-dvh flex-col bg-[#0d1b14] font-body text-[#f1faf0]">
        <PitchHeader
          formation={formation}
          onPlayers={onPlayers}
          onReset={resetFormation}
          onExport={onExport}
          setFormation={setFormation}
        />

        <main className="mx-auto flex-1 flex w-full max-w-190 items-center justify-center gap-5 px-3 py-4 sm:px-5">
          <div
            id="formation-export"
            className="w-full max-w-130 md:max-w-[70%] flex flex-col md:flex-row md:gap-4 p-2"
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
                    selected={selectedSlot === `pitch-${index}`}
                    onClick={() => handlePlayerClick(`pitch-${index}`)}
                  />
                );
              })}
            </div>

            <div className="mt-3 w-full md:w-1/5">
              <Bench
                players={players}
                setPlayers={setPlayers}
                getName={getName}
                selectedSlot={selectedSlot}
                onPlayerClick={handlePlayerClick}
              />
            </div>
          </div>
        </main>
      </div>
    </DragDropProvider >
  );
};

export default Pitch;
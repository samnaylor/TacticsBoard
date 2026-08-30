import { DragDropProvider } from "@dnd-kit/react";
import React, { useState } from "react";
import Bench from "./Bench";
import PitchHeader from "./PitchHeader";
import PitchMarkings from "./PitchMarkings";
import Player from "./Player";
import { defaultPlayers, formations } from "../data";
import logo from "../assets/addinghamfc.png";
import EditPlayerModal from "./EditPlayerModal";
import { useTacticsState } from "../store/tactics";

interface Props {
  names: string[];
  onExport: () => void;

  setNames: React.Dispatch<React.SetStateAction<string[]>>;
}

const Pitch = ({ names, onExport, setNames }: Props) => {
  const formation = useTacticsState(state => state.formation);

  const [players, setPlayers] = useState(defaultPlayers);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [editingPlayer, setEditingPlayer] = useState<number | null>(null);

  const setScreen = useTacticsState(state => state.setScreen);

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

  const handleEditPlayer = (playerNumber: number) => {
    setSelectedSlot(null);
    setEditingPlayer(playerNumber);
  };

  const handleSavePlayerName = (name: string) => {
    if (editingPlayer === null) {
      return;
    }

    setNames(current => {
      const next = [...current];

      next[editingPlayer - 1] = name;

      return next;
    })
  }

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

      <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-[#0d1b14] font-body text-[#f1faf0]">
        <PitchHeader
          onPlayers={() => setScreen("players")}
          onReset={resetFormation}
          onExport={onExport}
        />

        <main className="mx-auto flex w-full max-w-190 flex-1 min-w-0 items-center justify-center gap-5 px-3 py-4 sm:px-5">
          <div
            id="formation-export"
            className="flex w-full max-w-130 min-w-0 flex-col p-2 md:max-w-[70%] md:flex-row md:gap-4"
          >
            <div className="relative aspect-2/3 w-full overflow-hidden rounded-2xl bg-[#1e4d3a] shadow-[0_12px_40px_rgba(0,0,0,.35)]">
              <div className="pointer-events-none absolute inset-0 z-1 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,.07),transparent_35%)]" />

              <PitchMarkings />

              <img
                src={logo}
                className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 opacity-10"
                draggable={false}
              />

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
                    onEdit={() => handleEditPlayer(player)}
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
                handleEditPlayer={handleEditPlayer}
              />
            </div>
          </div>
        </main>
      </div>

      {
        editingPlayer &&
        <EditPlayerModal
          name={getName(editingPlayer)}
          onSave={handleSavePlayerName}
          onClose={() => setEditingPlayer(null)}
        />
      }
    </DragDropProvider >
  );
};

export default Pitch;
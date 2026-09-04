import { DragDropProvider } from "@dnd-kit/react";
import Bench from "./Bench";
import PitchMarkings from "./PitchMarkings";
import Player from "./Player";
import logo from "../assets/addinghamfc.webp";
import EditPlayerModal from "./EditPlayerModal";
import { useTacticsState } from "../store/state";
import { useRef } from "react";
import { formations, PITCH_COUNT } from "../data";
import type { Formation } from "../types";

const Pitch = () => {
  const dragDropEnabled = useTacticsState((state) => state.dragDropEnabled);
  const formation = useTacticsState((state) => state.formation);
  const customPositions = useTacticsState((state) => state.customPositions);
  const editingPlayer = useTacticsState(
    (state) => state.playerInteraction.type === "editing",
  );
  const swapNames = useTacticsState((state) => state.swapNames);
  const changeFormation = useTacticsState((state) => state.changeFormation);
  const movePlayerPosition = useTacticsState(
    (state) => state.movePlayerPosition,
  );
  const clearPlayerInteraction = useTacticsState(
    (state) => state.clearPlayerInteraction,
  );

  const pitchRef = useRef<HTMLDivElement>(null);
  const restrictionRef = useRef<HTMLDivElement>(null);

  const positions = customPositions ?? formations[formation];
  const custom = customPositions !== null;

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (!dragDropEnabled) {
          return;
        }

        if (event.canceled) {
          return;
        }

        const { source, target, position } = event.operation;

        if (!source) {
          return;
        }

        if (!target) {
          const rect = pitchRef.current!.getBoundingClientRect();
          const deltax = position.current.x - position.initial.x;
          const deltay = position.current.y - position.initial.y;

          const percentx = (deltax / rect.width) * 100;
          const percenty = (deltay / rect.height) * 100;

          movePlayerPosition(Number(source.id), percentx, percenty);

          return;
        }

        if (source.id === target.id) {
          return;
        }

        swapNames(Number(source!.id), Number(target.id));
      }}
    >
      <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden">
        <main className="mx-auto flex w-full min-w-0 max-w-190 flex-1 flex-col items-center justify-center gap-1 px-3 py-3 sm:px-5">
          <div className="flex w-full max-w-130 flex-col items-end gap-0.5 px-4">
            <label className="text-[10px] text-white/35">Formation</label>
            <select
              value={formation}
              onChange={(event) =>
                changeFormation(event.target.value as Formation)
              }
              className="rounded-md text-center border border-white/25 bg-black/10 px-1.5 py-0.5 text-[13px] text-[#f1faf0] outline-none focus:border-[#e9c46a]"
            >
              {Object.keys(formations).map((name) => (
                <option key={name} value={name}>
                  {name}
                  {name === formation && custom ? "*" : ""}
                </option>
              ))}
            </select>
          </div>

          <div
            id="formation-export"
            ref={restrictionRef}
            className="flex w-full max-w-130 min-w-0 flex-col p-2 md:max-w-[70%]"
          >
            <div
              ref={pitchRef}
              onClick={clearPlayerInteraction}
              className="relative aspect-2/3 w-full overflow-hidden rounded-2xl bg-[#1e4d3a] shadow-[0_12px_40px_rgba(0,0,0,.35)]"
            >
              <div className="pointer-events-none absolute inset-0 z-1 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,.07),transparent_35%)]" />

              <PitchMarkings />

              <img
                src={logo}
                width={768}
                height={768}
                decoding="async"
                className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 opacity-10"
                draggable={false}
              />

              {Array.from({ length: PITCH_COUNT }, (_, slot) => {
                const number = formations[formation][slot].number;
                const position = positions[slot];

                return (
                  <Player
                    key={`player-${slot}`}
                    number={number}
                    slot={slot}
                    position={position}
                    restrictionRef={restrictionRef}
                  />
                );
              })}
            </div>

            <div className="mt-3 w-full">
              <Bench restrictionRef={restrictionRef} />
            </div>
          </div>
        </main>
      </div>

      {editingPlayer && <EditPlayerModal />}
    </DragDropProvider>
  );
};

export default Pitch;

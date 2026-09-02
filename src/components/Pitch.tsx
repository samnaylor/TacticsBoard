import { DragDropProvider } from "@dnd-kit/react";
import Bench from "./Bench";
import PitchMarkings from "./PitchMarkings";
import Player from "./Player";
import logo from "../assets/addinghamfc.png";
import EditPlayerModal from "./EditPlayerModal";
import { useTacticsState } from "../store/tactics";
import { useRef } from "react";
import { formations, type Formation } from "../data";

const Pitch = () => {
  const formation = useTacticsState((state) => state.formation);
  const layout = useTacticsState((state) => state.layout);
  const editingPlayer = useTacticsState((state) => state.editingPlayer);
  const swapNames = useTacticsState((state) => state.swapNames);
  const changeFormation = useTacticsState((state) => state.changeFormation);
  const movePlayerPosition = useTacticsState(
    (state) => state.movePlayerPosition,
  );

  const pitchRef = useRef<HTMLDivElement>(null);

  const custom =
    layout.filter(
      (position, index) =>
        position.x === formations[formation][index].x &&
        position.y === formations[formation][index].y,
    ).length < 11;

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;

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
      <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-[#0d1b14] font-body text-[#f1faf0]">
        <main className="mx-auto flex-col flex w-full max-w-190 flex-1 min-w-0 items-center justify-center gap-5 px-3 py-3 sm:px-5">
          <div className="flex flex-col w-full items-left justify-start px-4 gap-0.5 float-start">
            <label className="text-[10px] text-white/35">Formation</label>
            <select
              value={formation}
              onChange={(event) =>
                changeFormation(event.target.value as Formation)
              }
              className="rounded-md text-center border border-white/25 bg-[#14261c] px-1.5 py-0.5 text-[13px] text-[#f1faf0] outline-none focus:border-[#e9c46a]"
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
            className="flex w-full max-w-130 min-w-0 flex-col p-2 md:max-w-[70%]"
          >
            <div
              ref={pitchRef}
              className="relative aspect-2/3 w-full overflow-hidden rounded-2xl bg-[#1e4d3a] shadow-[0_12px_40px_rgba(0,0,0,.35)]"
            >
              <div className="pointer-events-none absolute inset-0 z-1 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,.07),transparent_35%)]" />

              <PitchMarkings />

              <img
                src={logo}
                className="pointer-events-none absolute left-1/2 top-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 opacity-10"
                draggable={false}
              />

              {[...Array(11).keys()].map((slot) => {
                const number = layout[slot].number;
                const position = { x: layout[slot].x, y: layout[slot].y };

                return (
                  <Player
                    key={`player-${slot}`}
                    number={number}
                    slot={slot}
                    position={position}
                  />
                );
              })}
            </div>

            <div className="mt-3 w-full">
              <Bench />
            </div>
          </div>
        </main>
      </div>

      {editingPlayer !== null && <EditPlayerModal />}
    </DragDropProvider>
  );
};

export default Pitch;

import { DragDropProvider } from "@dnd-kit/react";
import Bench from "./Bench";
import PitchHeader from "./PitchHeader";
import PitchMarkings from "./PitchMarkings";
import Player from "./Player";
import logo from "../assets/addinghamfc.png";
import EditPlayerModal from "./EditPlayerModal";
import { useTacticsState } from "../store/tactics";
import { formations } from "../data";

interface Props {
  onExport: () => void;
}

const Pitch = ({ onExport }: Props) => {
  const formation = useTacticsState(state => state.formation);
  const editingPlayer = useTacticsState(state => state.editingPlayer);
  const swapNames = useTacticsState(state => state.swapNames);

  const layout = formations[formation];

  return (
    <DragDropProvider
      onDragEnd={(event) => {
        if (event.canceled) return;

        const { source, target } = event.operation;

        if (!target || source?.id === target.id) {
          return;
        }

        swapNames(Number(source!.id), Number(target.id));
      }}
    >

      <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-[#0d1b14] font-body text-[#f1faf0]">
        <PitchHeader onExport={onExport} />

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

              {[...Array(11).keys()].map(slot => {
                const number = layout[slot].number;
                const position = { x: layout[slot].x, y: layout[slot].y };

                return <Player
                  key={`player-${slot}`}
                  number={number}
                  slot={slot}
                  position={position}
                />;
              })}
            </div>

            <div className="mt-3 w-full md:w-1/5">
              <Bench />
            </div>
          </div>
        </main>
      </div>

      {
        editingPlayer !== null &&
        <EditPlayerModal />
      }
    </DragDropProvider >
  );
};

export default Pitch;
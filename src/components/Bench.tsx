import Player from "./Player";
import { useTacticsState } from "../store/state";
import IconButton from "./IconButton";

interface BenchProps {
  restrictionRef: React.RefObject<HTMLDivElement | null>;
}

const Bench = ({ restrictionRef }: BenchProps) => {
  const bench = useTacticsState((state) => state.bench);
  const decreaseBench = useTacticsState((state) => state.decreaseBench);
  const increaseBench = useTacticsState((state) => state.increaseBench);

  return (
    <section className="w-full">
      <div className="mb-2 flex items-end justify-between px-1">
        <div className="w-full">
          <div className="flex flex-row w-full items-center justify-between">
            <h2 className="text-md font-bold uppercase tracking-wider">
              Bench
            </h2>

            <div
              data-export-ignore
              className="flex items-center justify-center bg-black/10 border border-white/50 rounded"
            >
              <IconButton
                label="Add substitute"
                disabled={bench === 5}
                onClick={increaseBench}
                className="px-2 py-1 text-md font-extrabold rounded-none"
              >
                +
              </IconButton>

              <span className="min-w-8 text-center text-[10px] font-bold tabular-nums text-white/40">
                {bench}/5
              </span>

              <IconButton
                label="Remove substitute"
                disabled={bench === 0}
                onClick={decreaseBench}
                className="px-2 py-1 text-md font-extrabold rounded-none"
              >
                -
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      {
        <div className="flex w-full flex-row min-h-22 items-center justify-center gap-5 overflow-x-hidden rounded-xl border border-white/10 bg-black/10 px-4 py-3">
          {[...Array(bench).keys()].map((benchSlot) => {
            const slot = benchSlot + 11;

            return (
              <Player
                key={`bench-${benchSlot}`}
                number={slot + 1}
                slot={slot}
                restrictionRef={restrictionRef}
              />
            );
          })}
        </div>
      }
    </section>
  );
};

export default Bench;

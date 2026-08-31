import Player from "./Player";
import { useTacticsState } from "../store/tactics";

const Bench = () => {
  const bench = useTacticsState(state => state.bench);
  const decreaseBench = useTacticsState(state => state.decreaseBench);
  const increaseBench = useTacticsState(state => state.increaseBench);

  return (
    <section className="w-full">
      <div className="mb-2 flex items-end justify-between px-1">
        <div className="w-full">
          <div className="flex flex-row md:flex-col w-full items-center justify-between">
            <h2 className="text-md font-bold uppercase tracking-wider">
              Bench
            </h2>

            <div data-export-ignore className="flex items-center justify-center">
              <button
                disabled={bench === 5}
                onClick={increaseBench}
                className="rounded-lg px-2 py-2 text-md font-extrabold text-white/50 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-20">+</button>

              <span className="min-w-8 text-center text-[10px] font-bold tabular-nums text-white/40">
                {bench}/5
              </span>

              <button
                disabled={bench === 0}
                onClick={decreaseBench}
                className="rounded-lg px-2 py-2 text-md font-extrabold text-white/50 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-20">-</button>
            </div>
          </div>
        </div>
      </div>

      {
        bench > 0 &&
        <div className="flex w-full flex-row md:flex-col min-h-22 items-center justify-center gap-5 overflow-x-hidden rounded-xl border border-white/10 bg-black/10 px-4 py-3">
          {[...Array(bench).keys()].map(benchSlot => {
            const slot = benchSlot + 11;

            return (
              <Player
                key={`bench-${benchSlot}`}
                number={slot + 1}
                slot={slot}
              />
            );
          })}
        </div>
      }
    </section >
  );
};

export default Bench;

import { MdAdd, MdClose } from "react-icons/md";
import { useTacticsState } from "../store/tactics";
import Divider from "./Divider";

const PlayerEditor = () => {
  const bench = useTacticsState((state) => state.bench);
  const names = useTacticsState((state) => state.names);
  const changeName = useTacticsState((state) => state.changeName);
  const increaseBench = useTacticsState((state) => state.increaseBench);
  const decreaseBench = useTacticsState((state) => state.decreaseBench);

  return (
    <main className="mx-auto min-h-0 w-full max-w-190 px-4 py-3">
      <div className="space-y-2">
        <Divider label="Starting XI" />

        {[...Array(11).keys()].map((slot) => {
          const { name, modified } = names[slot];

          return (
            <input
              key={`player-editor-input-${slot}`}
              value={modified ? name : ""}
              onChange={(event) => changeName(slot, event.target.value)}
              className="w-full flex text-sm font-medium placeholder:text-white/25 p-2.5 bg-white/[0.035] rounded-xl border border-white/20 focus:border-[#c59154] outline-none"
              placeholder={`Player ${slot + 1}`}
            />
          );
        })}

        <Divider label="Bench" />

        {bench !== 0 &&
          [...Array(bench).keys()].map((slot) => {
            const { name, modified } = names[slot + 11];

            return (
              <div className="flex flex-row w-full gap-2">
                <input
                  key={`player-editor-input-${slot}`}
                  value={modified ? name : ""}
                  onChange={(event) => changeName(slot, event.target.value)}
                  className="w-full flex text-sm font-medium placeholder:text-white/25 p-2.5 bg-white/[0.035] rounded-xl border border-white/20 focus:border-[#c59154] outline-none"
                  placeholder={`Player ${slot + 12}`}
                />
                <button
                  onClick={decreaseBench}
                  className="group text-sm font-medium placeholder:text-white/25 p-2.5 bg-white/[0.035] rounded-xl border border-white/20 outline-none hover:bg-white/10"
                >
                  <MdClose className="w-4 h-4 text-white/50 transition hover:text-white" />
                </button>
              </div>
            );
          })}

        {[...Array(5 - bench).keys()].map((slot) => {
          return (
            <button
              key={`add-bench-${slot}`}
              onClick={increaseBench}
              className="group w-full flex text-sm items-center gap-2 justify-center font-medium p-2.5 bg-white/[0.035] rounded-xl border border-white/20 text-white/25 hover:text-white outline-none transition hover:bg-white/10"
            >
              <span>Add Sub</span>
              <MdAdd className="w-4 h-4 text-white/50 transition group-hover:text-white" />
            </button>
          );
        })}
      </div>
    </main>
  );
};

export default PlayerEditor;

import { useTacticsState } from "../store/tactics";

const PlayerEditor = () => {
  const bench = useTacticsState((state) => state.bench);
  const names = useTacticsState((state) => state.names);
  const changeName = useTacticsState((state) => state.changeName);

  return (
    <main className="mx-auto min-h-0 w-full max-w-190 px-4 py-6">
      <div className="space-y-2">
        {[...Array(11 + bench).keys()].map((slot) => {
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
      </div>
    </main>
  );
};

export default PlayerEditor;

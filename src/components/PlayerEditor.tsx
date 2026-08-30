import PlayerEditorHeader from "./PlayerEditorHeader";
import { useTacticsState } from "../store/tactics";

const PlayerEditor = () => {
  const names = useTacticsState(state => state.names);
  const setNames = useTacticsState(state => state.setNames);

  return (
    <>
      <PlayerEditorHeader />

      <main className="mx-auto min-h-screen w-full max-w-190 px-4 py-5">

        <div className="space-y-2">
          {names.map((name, index) => (
            <label
              key={index}
              className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.035] p-2.5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-[#c59154] bg-[#020165] text-xs font-bold">
                {index + 1}
              </span>

              <input
                value={name === `Player ${index + 1}` ? "" : name}
                onChange={(event) => {
                  const value = event.target.value;

                  const next = [...names];
                  next[index] = value;

                  setNames(next);
                }}
                className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-white/25"
                placeholder={`Player ${index + 1}`}
              />
            </label>
          ))}
        </div>
      </main>
    </>
  );
};

export default PlayerEditor;
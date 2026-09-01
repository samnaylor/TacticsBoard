import PlayerEditorHeader from "./PlayerEditorHeader";
import { useTacticsState } from "../store/tactics";

const PlayerEditor = () => {
  const names = useTacticsState(state => state.names);
  const changeName = useTacticsState(state => state.changeName);

  return (
    <>
      <PlayerEditorHeader />

      <main className="mx-auto min-h-screen w-full max-w-190 px-4 py-5">
        <div className="space-y-2">
          {names.map(({ name, modified }, index) => (
            <input
              key={`player-editor-input-${index}`}
              value={modified ? name : ""}
              onChange={(event) => changeName(index, event.target.value)}
              className="w-full flex text-sm font-medium placeholder:text-white/25 p-2.5 bg-white/[0.035] rounded-xl border border-white/20 focus:border-[#c59154] outline-none"
              placeholder={`Player ${index + 1}`}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default PlayerEditor;
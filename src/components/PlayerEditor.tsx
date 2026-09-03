import { MdAdd, MdClose } from "react-icons/md";
import { useTacticsState } from "../store/state";
import Divider from "./Divider";
import PlayerNameInput from "./PlayerNameInput";
import IconButton from "./IconButton";
import { MAX_BENCH_COUNT, PITCH_COUNT } from "../data";

const PlayerEditor = () => {
  const bench = useTacticsState((state) => state.benchCount);
  const addSubstitute = useTacticsState((state) => state.addSubstitute);
  const removeSubstitute = useTacticsState((state) => state.removeSubstitute);

  return (
    <main className="mx-auto min-h-0 w-full max-w-190 px-4 py-3">
      <div className="space-y-2">
        <Divider label="Starting XI" />

        {Array.from({ length: PITCH_COUNT }).map((_, slot) => (
          <PlayerNameInput slot={slot} />
        ))}

        <Divider label="Bench" />

        {Array.from({ length: bench }, (_, benchIndex) => {
          const slot = benchIndex + PITCH_COUNT;

          return (
            <div key={slot} className="flex w-full gap-2">
              <PlayerNameInput slot={slot} />
              <IconButton
                label="Remove sub"
                variant="surface"
                onClick={() => removeSubstitute(slot)}
                className="group p-2.5 outline-none"
              >
                <MdClose className="h-4 w-4 text-white/50 transition group-hover:text-white" />
              </IconButton>
            </div>
          );
        })}

        {bench < MAX_BENCH_COUNT && (
          <IconButton
            label="Add sub"
            variant="surface"
            onClick={addSubstitute}
            className="group flex w-full items-center justify-center gap-2 p-2.5 text-sm font-medium outline-none"
          >
            <span>Add Sub</span>
            <MdAdd className="w-4 h-4 text-white/50 transition group-hover:text-white" />
          </IconButton>
        )}
      </div>
    </main>
  );
};

export default PlayerEditor;

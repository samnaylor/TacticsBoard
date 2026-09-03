import { MdAdd, MdClose } from "react-icons/md";
import { useTacticsState } from "../store/state";
import Divider from "./Divider";
import PlayerNameInput from "./PlayerNameInput";
import IconButton from "./IconButton";

const PlayerEditor = () => {
  const bench = useTacticsState((state) => state.bench);
  const increaseBench = useTacticsState((state) => state.increaseBench);
  const decreaseBench = useTacticsState((state) => state.decreaseBench);

  return (
    <main className="mx-auto min-h-0 w-full max-w-190 px-4 py-3">
      <div className="space-y-2">
        <Divider label="Starting XI" />

        {Array.from({ length: 11 }).map((_, slot) => (
          <PlayerNameInput slot={slot} />
        ))}

        <Divider label="Bench" />

        {Array.from({ length: bench }, (_, benchIndex) => {
          const slot = benchIndex + 11;

          return (
            <div key={slot} className="flex w-full flex-row gap-2">
              <PlayerNameInput slot={slot} />
              <IconButton
                label="Remove sub"
                onClick={decreaseBench}
                className="group rounded-xl border border-white/20 bg-white/[0.035] p-2.5 outline-none hover:bg-white/10"
              >
                <MdClose className="h-4 w-4 text-white/50 transition group-hover:text-white" />
              </IconButton>
            </div>
          );
        })}

        {bench < 5 && (
          <IconButton
            label="Add sub"
            onClick={increaseBench}
            className="group w-full flex text-sm items-center gap-2 justify-center font-medium p-2.5 bg-white/[0.035] rounded-xl border border-white/20 text-white/25 hover:text-white outline-none transition hover:bg-white/10"
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

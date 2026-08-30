import type React from "react";
import { defaultNames } from "../data";
import logo from "../assets/addinghamfc.png";
import { useTacticsState } from "../store/tactics";

interface Props {
  setNames: React.Dispatch<React.SetStateAction<string[]>>;
}

const PlayerEditorHeader = ({ setNames }: Props) => {
  const setScreen = useTacticsState(state => state.setScreen);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d1b14]/95 px-3 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-190 items-center justify-between gap-3">
        <img src={logo} draggable={false} className="w-8 h-8" />

        <div className="flex flex-row justify-center items-center gap-1.5" />

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            onClick={() => setNames(defaultNames)}
            className="rounded-lg px-2.5 py-2 text-xs font-semibold text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            Reset
          </button>

          <button
            onClick={() => setScreen("pitch")}
            className="rounded-lg bg-amber-300 px-2.5 py-2 text-xs font-bold text-[#13251b] shadow-sm transition hover:bg-amber-200"
          >
            Done
          </button>
        </div>
      </div>
    </header >
  );
}

export default PlayerEditorHeader;

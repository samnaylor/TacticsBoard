import type React from "react";
import { formations } from "../data";

interface Props {
  formation: string;

  onPlayers: () => void;
  onReset: () => void;
  onExport: () => void;

  setFormation: React.Dispatch<React.SetStateAction<"4-4-2" | "4-2-3-1">>;
}

const Header = ({ formation, onPlayers, onReset, onExport, setFormation }: Props) => {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0d1b14]/95 px-3 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-190 items-center justify-between gap-3">
        <div className="flex flex-row justify-center items-center gap-1.5">
          <select
            value={formation}
            onChange={(event) => setFormation(event.target.value as "4-4-2" | "4-2-3-1")}
            className="w-full rounded border border-white/25 bg-[#14261c] px-1.5 py-0.5 text-[13px] text-[#f1faf0] outline-none focus:border-[#e9c46a]"
          >
            {Object.keys(formations).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            onClick={onReset}
            className="rounded-lg px-2.5 py-2 text-xs font-semibold text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            Reset
          </button>

          <button
            onClick={onPlayers}
            className="rounded-lg bg-white/10 px-2.5 py-2 text-xs font-semibold transition hover:bg-white/15"
          >
            Players
          </button>

          <button
            onClick={onExport}
            className="rounded-lg bg-amber-300 px-2.5 py-2 text-xs font-bold text-[#13251b] shadow-sm transition hover:bg-amber-200"
          >
            Export PNG
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
import type React from "react";
import { defaultNames } from "../data";

interface Props {
  names: string[];
  setNames: React.Dispatch<React.SetStateAction<string[]>>;
  onBack: () => void;
}

const PlayerEditor = ({ names, setNames, onBack }: Props) => {
  return (
    <main className="mx-auto min-h-screen w-full max-w-190 px-4 py-5">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xl font-semibold uppercase">
            Squad
          </p>
        </div>
        <div className="flex justify-center shrink-0 gap-1.5">

          <button
            onClick={() => setNames(defaultNames)}
            className="rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold hover:bg-white/15"
          >
            Reset
          </button>

          <button
            onClick={onBack}
            className="rounded-lg bg-white/10 px-3 py-2 text-xs font-semibold hover:bg-white/15"
          >
            Done
          </button>
        </div>
      </header>

      <div className="space-y-2">
        {names.map((name, index) => (
          <label
            key={index}
            className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.035] p-2.5"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-amber-300 border-2  bg-blue-600 text-xs font-bold">
              {index + 1}
            </span>

            <input
              value={name}
              onChange={(event) => {
                const value = event.target.value;

                setNames((current) => {
                  const next = [...current];
                  next[index] = value;
                  return next;
                });
              }}
              className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-white/25"
              placeholder={`Player ${index + 1}`}
            />
          </label>
        ))}
      </div>
    </main>
  );
};

export default PlayerEditor;
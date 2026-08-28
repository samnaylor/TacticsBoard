import type React from "react";
import Player from "./Player";

interface Props {
  players: number[];
  setPlayers: React.Dispatch<React.SetStateAction<number[]>>;

  getName: (player: number) => string;
}

const Bench = ({ players, setPlayers, getName }: Props) => {
  return (
    <section className="w-full">
      <div className="mb-2 flex items-end justify-between px-1">
        <div className="w-full">
          <div className="flex flex-row md:flex-col w-full items-center justify-between">
            <h2 className="text-md font-bold uppercase tracking-wider">
              Bench
            </h2>

            <div data-export-ignore className="flex gap-1.5 items-center justify-center">
              <button
                disabled={players.length >= 5}
                onClick={() => setPlayers(players => {
                  if (players.length >= 16) {
                    return players;
                  }

                  return [...players, players[players.length - 1] + 1];
                })}
                className="rounded-lg px-2 py-2 text-md font-extrabold text-white/50 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-20">+</button>

              <span className="min-w-8 text-center text-[10px] font-bold tabular-nums text-white/40">
                {players.length}/5
              </span>

              <button
                disabled={players.length <= 0}
                onClick={() => setPlayers(players => {
                  if (players.length <= 11) {
                    return players;
                  }

                  return players.slice(0, -1);
                })}
                className="rounded-lg px-2 py-2 text-md font-extrabold text-white/50 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-20">-</button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-fullflex-row md:flex-col min-h-22 items-center justify-center gap-5 overflow-x-auto rounded-xl border border-white/10 bg-black/10 px-4 py-3">
        {players.map((player, index) => (
          <Player
            key={index}
            id={12 + index}
            slotId={`bench-${index}`}
            name={getName(player)}
            compact
          />
        ))}
      </div>
    </section >
  );
};

export default Bench;

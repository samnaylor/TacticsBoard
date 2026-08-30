import Player from "./Player";
import { useTacticsState } from "../store/tactics";

interface Props {
  getName: (player: number) => string;

  selectedSlot: string | null;
  onPlayerClick: (slotId: string) => void;
  handleEditPlayer: (playerNumber: number) => void;
}

const Bench = ({ getName, selectedSlot, onPlayerClick, handleEditPlayer }: Props) => {
  const players = useTacticsState(state => state.players);
  const setPlayers = useTacticsState(state => state.setPlayers);

  return (
    <section className="w-full">
      <div className="mb-2 flex items-end justify-between px-1">
        <div className="w-full">
          <div className="flex flex-row md:flex-col w-full items-center justify-between">
            <h2 className="text-md font-bold uppercase tracking-wider">
              Bench
            </h2>

            <div data-export-ignore className="flex items-center justify-center">
              <button
                disabled={players.length >= 16}
                onClick={() => {
                  if (players.length >= 16) {
                    return players;
                  }

                  const nextNumber = [12, 13, 14, 15, 16].find(number => !players.includes(number));

                  if (!nextNumber) {
                    return players;
                  }

                  setPlayers([...players, nextNumber]);
                }}
                className="rounded-lg px-2 py-2 text-md font-extrabold text-white/50 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-20">+</button>

              <span className="min-w-8 text-center text-[10px] font-bold tabular-nums text-white/40">
                {players.length - 11}/5
              </span>

              <button
                disabled={players.length <= 0}
                onClick={() => {
                  if (players.length <= 11) {
                    return players;
                  }

                  setPlayers(players.slice(0, -1));
                }}
                className="rounded-lg px-2 py-2 text-md font-extrabold text-white/50 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-20">-</button>
            </div>
          </div>
        </div>
      </div>

      {
        players.length > 11 &&
        <div className="flex w-full flex-row md:flex-col min-h-22 items-center justify-center gap-5 overflow-x-hidden rounded-xl border border-white/10 bg-black/10 px-4 py-3">
          {players.slice(11).map((player, index) => (
            <Player
              key={index}
              id={player}
              slotId={`bench-${index}`}
              name={getName(player)}
              selected={selectedSlot === `bench-${index}`}
              onClick={() => onPlayerClick(`bench-${index}`)}
              onEdit={() => handleEditPlayer(player)}
            />
          ))}
        </div>
      }
    </section >
  );
};

export default Bench;

import { useTacticsState } from "../store/state";

interface PlayerNameInputProps {
  slot: number;
}

const PlayerNameInput = ({ slot }: PlayerNameInputProps) => {
  const { name, modified } = useTacticsState((state) => state.names)[slot]!;
  const changeName = useTacticsState((state) => state.renamePlayer);

  return (
    <input
      value={modified ? name : ""}
      onChange={(event) => changeName(slot, event.target.value)}
      className="w-full flex text-sm font-medium placeholder:text-white/25 p-2.5 bg-white/[0.035] rounded-xl border border-white/20 focus:border-[#c59154] outline-none"
      placeholder={`Player ${slot + 1}`}
    />
  );
};

export default PlayerNameInput;

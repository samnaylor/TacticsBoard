import { useTacticsState } from "../store/state";
import { playerLabel } from "../utils";

interface PlayerNameInputProps {
  slot: number;
}

const PlayerNameInput = ({ slot }: PlayerNameInputProps) => {
  const customName = useTacticsState((state) => state.customNames[slot]);
  const renamePlayer = useTacticsState((state) => state.renamePlayer);
  const storedValue = customName ?? "";

  return (
    <input
      key={storedValue}
      defaultValue={storedValue}
      onBlur={(event) => {
        if (event.currentTarget.value !== storedValue) {
          renamePlayer(slot, event.currentTarget.value);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" && !event.nativeEvent.isComposing) {
          event.currentTarget.blur();
        }
      }}
      className="flex w-full rounded-xl border border-white/20 bg-white/[0.035] p-2.5 text-sm font-medium outline-none placeholder:text-white/25 focus:border-[#c59154]"
      placeholder={playerLabel(slot)}
    />
  );
};

export default PlayerNameInput;

import React, { useEffect, useRef, useState } from "react";
import { useTacticsState } from "../store/state";
import { playerLabel } from "../utils";
import Modal from "./Modal";

const EditPlayerModal = () => {
  const playerInteraction = useTacticsState((state) => state.playerInteraction);
  const editingPlayer =
    playerInteraction.type === "editing" ? playerInteraction.slot : 0;
  const customName = useTacticsState(
    (state) => state.customNames[editingPlayer],
  );

  const changeName = useTacticsState((state) => state.renamePlayer);
  const closePlayerEditor = useTacticsState((state) => state.closePlayerEditor);

  const [value, setValue] = useState(customName ?? playerLabel(editingPlayer));

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();

    const trimmed = value.trim();

    changeName(editingPlayer, trimmed);
    closePlayerEditor();
  };

  return (
    <Modal title="Edit player name" onClose={closePlayerEditor}>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          value={value}
          type="text"
          onChange={(event) => setValue(event.target.value)}
          className="w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2.5 text-sm text-white outline-none focus:border-amber-300"
          placeholder="Player name"
        />

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={closePlayerEditor}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!value.trim()}
            className="rounded-lg bg-amber-300 px-4 py-2 text-sm font-bold text-[#13251b] transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditPlayerModal;

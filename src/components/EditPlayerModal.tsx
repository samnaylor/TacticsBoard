import React, { useState } from "react";
import { useTacticsState } from "../store/tactics";

const EditPlayerModal = () => {
  const names = useTacticsState(state => state.names);
  const editingPlayer = useTacticsState(state => state.editingPlayer)!;

  const changeName = useTacticsState(state => state.changeName);
  const setEditingPlayer = useTacticsState(state => state.setEditingPlayer);

  const [value, setValue] = useState(names[editingPlayer]);

  const onClose = () => setEditingPlayer(null);

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();

    const trimmed = value.trim();

    if (!trimmed) {
      return;
    }

    changeName(editingPlayer, value);
    setEditingPlayer(null);
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#14261c] p-5 shadow-2xl"
      >
        <h2 className="mb-4 text-lg font-bold">
          Edit player name
        </h2>

        <input
          autoFocus
          value={value}
          onChange={(event) => setValue(event.target.value)}
          className="w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2.5 text-sm text-white outline-none focus:border-amber-300"
          placeholder="Player name"
        />

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
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
    </div>
  );
};

export default EditPlayerModal;

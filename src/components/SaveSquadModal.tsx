import { useEffect, useRef, useState } from "react";
import { useTacticsState } from "../store/state";
import { createSquadCopyTitle, MAX_SQUAD_TITLE_LENGTH } from "../store/squads";
import Modal from "./Modal";

const SaveSquadModal = () => {
  const activeSquad = useTacticsState((state) =>
    state.savedSquads.find((squad) => squad.id === state.activeSquadId),
  );
  const closeSquadDialog = useTacticsState((state) => state.closeSquadDialog);
  const saveSquad = useTacticsState((state) => state.saveSquad);
  const updateActiveSquad = useTacticsState((state) => state.updateActiveSquad);

  const [title, setTitle] = useState(
    activeSquad ? createSquadCopyTitle(activeSquad.title) : "",
  );
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const handleSaveAsNew = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveSquad(title);
  };

  return (
    <Modal
      title={activeSquad ? "Save squad changes" : "Save squad"}
      onClose={closeSquadDialog}
    >
      <form onSubmit={handleSaveAsNew}>
        {activeSquad && (
          <p className="mb-4 text-sm leading-6 text-white/65">
            Update “{activeSquad.title}”, or keep it unchanged and save this
            version as a new squad.
          </p>
        )}

        <label
          htmlFor="squad-save-title"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-white/50"
        >
          {activeSquad ? "New squad name" : "Squad name"}
        </label>
        <input
          ref={inputRef}
          id="squad-save-title"
          value={title}
          type="text"
          maxLength={MAX_SQUAD_TITLE_LENGTH}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full rounded-lg border border-white/15 bg-black/20 px-3 py-2.5 text-sm text-white outline-none focus:border-amber-300"
          placeholder="e.g. Saturday first team"
        />

        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={closeSquadDialog}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            Cancel
          </button>

          {activeSquad && (
            <button
              type="button"
              onClick={updateActiveSquad}
              className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Update existing
            </button>
          )}

          <button
            type="submit"
            disabled={!title.trim()}
            className="rounded-lg bg-amber-300 px-4 py-2 text-sm font-bold text-[#13251b] transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {activeSquad ? "Save as new" : "Save squad"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default SaveSquadModal;

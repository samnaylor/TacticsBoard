import { useState } from "react";
import { MdCheck, MdDeleteOutline } from "react-icons/md";
import { PITCH_COUNT } from "../data";
import { useTacticsState } from "../store/state";
import IconButton from "./IconButton";
import Modal from "./Modal";

const LoadSquadModal = () => {
  const savedSquads = useTacticsState((state) => state.savedSquads);
  const activeSquadId = useTacticsState((state) => state.activeSquadId);
  const closeSquadDialog = useTacticsState((state) => state.closeSquadDialog);
  const loadSavedSquad = useTacticsState((state) => state.loadSavedSquad);
  const deleteSavedSquad = useTacticsState((state) => state.deleteSavedSquad);

  const [deletingSquadId, setDeletingSquadId] = useState<string | null>(null);
  const deletingSquad = savedSquads.find(
    (squad) => squad.id === deletingSquadId,
  );

  return (
    <Modal title="Load a squad" onClose={closeSquadDialog}>
      {savedSquads.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/15 px-4 py-8 text-center">
          <p className="text-sm font-semibold text-white/75">
            No saved squads yet
          </p>
          <p className="mt-1 text-xs leading-5 text-white/45">
            Save the current board and it will appear here.
          </p>
        </div>
      ) : (
        <ul className="max-h-[min(55vh,28rem)] space-y-2 overflow-y-auto pr-1">
          {savedSquads.map((squad) => {
            const isActive = squad.id === activeSquadId;

            return (
              <li
                key={squad.id}
                className="flex items-center gap-1 rounded-xl border border-white/10 bg-black/10 p-1 transition hover:border-white/20 hover:bg-white/[0.04]"
              >
                <button
                  type="button"
                  onClick={() => loadSavedSquad(squad.id)}
                  className="min-w-0 flex-1 rounded-lg px-3 py-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                >
                  <span className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold text-white">
                      {squad.title}
                    </span>
                    {isActive && (
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-300/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-200">
                        <MdCheck aria-hidden="true" /> Current
                      </span>
                    )}
                  </span>
                  <span className="mt-1 block text-xs text-white/45">
                    {squad.formation} · {PITCH_COUNT + squad.benchCount} players
                  </span>
                </button>

                <IconButton
                  label={`Delete ${squad.title}`}
                  onClick={() => setDeletingSquadId(squad.id)}
                  className="shrink-0 p-2 text-white/35 hover:text-red-300"
                >
                  <MdDeleteOutline className="h-5 w-5" />
                </IconButton>
              </li>
            );
          })}
        </ul>
      )}

      {deletingSquad && (
        <div className="mt-4 rounded-xl border border-red-300/20 bg-red-300/[0.06] p-3">
          <p className="text-sm text-white/75">
            Delete “{deletingSquad.title}”? This cannot be undone.
          </p>
          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setDeletingSquadId(null)}
              className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              Keep squad
            </button>
            <button
              type="button"
              onClick={() => {
                deleteSavedSquad(deletingSquad.id);
                setDeletingSquadId(null);
              }}
              className="rounded-lg bg-red-400/90 px-3 py-1.5 text-xs font-bold text-[#241010] transition hover:bg-red-300"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={closeSquadDialog}
          className="rounded-lg px-4 py-2 text-sm font-semibold text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default LoadSquadModal;

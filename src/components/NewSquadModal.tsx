import { useTacticsState } from "../store/state";
import Modal from "./Modal";

const NewSquadModal = () => {
  const closeSquadDialog = useTacticsState((state) => state.closeSquadDialog);
  const createNewSquad = useTacticsState((state) => state.createNewSquad);

  return (
    <Modal title="Create new squad?" onClose={closeSquadDialog}>
      <p className="text-sm leading-6 text-white/65">
        Your unsaved changes will be lost. Saved squads will not be affected.
      </p>

      <div className="mt-5 flex justify-end gap-2">
        <button
          type="button"
          onClick={closeSquadDialog}
          className="rounded-lg px-4 py-2 text-sm font-semibold text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          Keep editing
        </button>
        <button
          type="button"
          onClick={createNewSquad}
          className="rounded-lg bg-red-400/90 px-4 py-2 text-sm font-bold text-[#241010] transition hover:bg-red-300"
        >
          Discard changes
        </button>
      </div>
    </Modal>
  );
};

export default NewSquadModal;

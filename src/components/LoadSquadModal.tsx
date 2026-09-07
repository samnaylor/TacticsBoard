import React, { useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import IconButton from "./IconButton";
import { motion } from "motion/react";
import { useTacticsState } from "../store/state";

const LoadSquadModal = () => {
  const savedSquads = useTacticsState((state) => state.savedSquads);
  const setLoading = useTacticsState((state) => state.setLoading);
  const loadSavedSquad = useTacticsState((state) => state.loadSavedSquad);

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog || dialog.open) {
      return;
    }

    dialog.showModal();

    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, []);

  const closeDialog = () => {
    setLoading(false);
    dialogRef.current?.close();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      closeDialog();
    }
  };

  return (
    <motion.dialog
      ref={dialogRef}
      onCancel={closeDialog}
      onClick={handleBackdropClick}
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.75 }}
      transition={{ duration: 0.3 }}
      className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-white/10 bg-[#14261c] p-0 text-white shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-[2px]"
    >
      <form onSubmit={() => {}} className="relative p-5">
        <IconButton
          label="Close"
          onClick={closeDialog}
          className="absolute right-4 top-4 p-1"
          aria-label="Close"
        >
          <MdClose size={24} />
        </IconButton>

        <h2 className="mb-4 text-lg font-bold">Load a squad</h2>

        {savedSquads.map((squad) => (
          <button onClick={() => loadSavedSquad(squad.id)}>{squad.id}</button>
        ))}

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={closeDialog}
            className="rounded-lg px-4 py-2 text-sm font-semibold text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.dialog>
  );
};

export default LoadSquadModal;

import React, { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { useTacticsState } from "../store/state";
import IconButton from "./IconButton";

const EditPlayerModal = () => {
  const names = useTacticsState((state) => state.names);
  const editingPlayer = useTacticsState((state) => state.editingPlayer)!;

  const changeName = useTacticsState((state) => state.changeName);
  const setEditingPlayer = useTacticsState((state) => state.setEditingPlayer);

  const { name } = names[editingPlayer];
  const [value, setValue] = useState(name);

  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog || dialog.open) {
      return;
    }

    dialog.showModal();

    requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });

    return () => {
      if (dialog.open) {
        dialog.close();
      }
    };
  }, []);

  const closeDialog = () => {
    setEditingPlayer(null);
    dialogRef.current?.close();
  };

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();

    const trimmed = value.trim();

    changeName(editingPlayer, trimmed);
    closeDialog();
  };

  const handleCancel = (event: React.SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    closeDialog();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      closeDialog();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-white/10 bg-[#14261c] p-0 text-white shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-[2px]"
    >
      <form onSubmit={handleSubmit} className="relative p-5">
        <IconButton
          label="Close"
          onClick={closeDialog}
          className="absolute right-4 top-4 rounded-md p-1 text-white/60 transition hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <MdClose size={24} />
        </IconButton>

        <h2 className="mb-4 text-lg font-bold">Edit player name</h2>

        <input
          autoFocus
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
            onClick={closeDialog}
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
    </dialog>
  );
};

export default EditPlayerModal;

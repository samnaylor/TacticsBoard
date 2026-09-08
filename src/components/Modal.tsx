import { useEffect, useId, useRef, type ReactNode } from "react";
import { MdClose } from "react-icons/md";
import { motion } from "motion/react";
import IconButton from "./IconButton";

interface Props {
  title: string;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ title, onClose, children }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

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

  const handleCancel = (event: React.SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    onClose();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.75 }}
      transition={{ duration: 0.2 }}
      className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-white/25 bg-[#14261c] p-0 text-white shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-xs"
    >
      <div className="relative p-5">
        <IconButton
          label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 p-1"
        >
          <MdClose size={24} />
        </IconButton>

        <h2 id={titleId} className="mb-4 pr-10 text-lg font-bold">
          {title}
        </h2>

        {children}
      </div>
    </motion.dialog>
  );
};

export default Modal;

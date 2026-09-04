import { useEffect } from "react";
import { HiOutlineClipboard } from "react-icons/hi";
import IconButton from "./IconButton";
import { MdClose } from "react-icons/md";

export interface ToastItem {
  id: string;
  message: string;
  duration: number;
}

interface ToastProps {
  message: string;
  duration: number;
  onDismiss: () => void;
}

const Toast = ({ message, duration, onDismiss }: ToastProps) => {
  useEffect(() => {
    const autoCloseTimer = setTimeout(() => {
      onDismiss();
    }, duration);

    return () => clearTimeout(autoCloseTimer);
  }, [duration, onDismiss]);

  return (
    <div
      className="bg-black/85 flex items-center w-full p-4 text-body rounded-md shadow-xs border border-white/25"
      role="alert"
    >
      <HiOutlineClipboard className="w-6 h-6" />

      <div className="ms-2.5 text-sm border-s border-default ps-3.5 flex-1 wrap-break-word">
        {message}
      </div>

      <IconButton
        label="Dismiss"
        variant="ghost"
        className="p-2 hover:text-white"
        onClick={onDismiss}
      >
        <MdClose />
      </IconButton>
    </div>
  );
};

export default Toast;

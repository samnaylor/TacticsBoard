import { useEffect } from "react";
import IconButton from "./IconButton";
import { MdClose, MdInfoOutline } from "react-icons/md";
import type { ToastItem } from "../types";

interface ToastProps extends ToastItem {
  onDismiss: (id: string) => void;
}

const Toast = ({ id, message, duration, onDismiss }: ToastProps) => {
  useEffect(() => {
    const autoCloseTimer = setTimeout(() => {
      onDismiss(id);
    }, duration);

    return () => clearTimeout(autoCloseTimer);
  }, [duration, id, onDismiss]);

  return (
    <div
      className="bg-black/85 flex items-center w-full p-4 text-body rounded-md shadow-xs border border-white/25"
      role="alert"
    >
      <MdInfoOutline className="h-6 w-6" />

      <div className="ms-2.5 text-sm border-s border-default ps-3.5 flex-1 wrap-break-word">
        {message}
      </div>

      <IconButton
        label="Dismiss"
        variant="ghost"
        className="p-2 hover:text-white"
        onClick={() => onDismiss(id)}
      >
        <MdClose />
      </IconButton>
    </div>
  );
};

export default Toast;

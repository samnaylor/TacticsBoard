import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: ReactNode;
}

const IconButton = ({
  label,
  children,
  className = "",
  ...props
}: IconButtonProps) => {
  return (
    <button
      type="button"
      title={label}
      className={`rounded-lg text-white-50 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-20 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;

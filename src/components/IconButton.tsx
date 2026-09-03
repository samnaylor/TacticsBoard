import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: ReactNode;
  variant?: "ghost" | "surface" | "segmented";
}

const variantClasses = {
  ghost: "rounded-lg text-white/50 hover:bg-white/10 hover:text-white",
  surface:
    "rounded-xl border border-white/20 bg-white/[0.035] text-white/25 hover:bg-white/10 hover:text-white",
  segmented: "rounded-none text-white/50 hover:bg-white/10 hover:text-white",
};

const IconButton = ({
  label,
  children,
  variant = "ghost",
  className = "",
  ...props
}: IconButtonProps) => {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className={`transition-colors disabled:cursor-not-allowed disabled:opacity-20 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;

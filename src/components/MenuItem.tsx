interface MenuItemsProps {
  icon: React.ReactNode;
  label: string | React.ReactNode;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}

const MenuItem = ({
  icon,
  label,
  onClick,
  active = false,
  disabled = false,
}: MenuItemsProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        group relative flex w-full items-center gap-3 rounded-xl p-3
        text-sm font-medium outline-none transition-colors duration-200
        ${
          disabled
            ? "cursor-not-allowed text-white/20"
            : active
              ? "bg-emerald-400/12 text-white"
              : "text-white/55 hover:bg-white/[0.07] hover:text-white"
        }
      `}
    >
      <span
        className={`
          text-xl transition-colors
          ${
            disabled
              ? "text-white/15"
              : active
                ? "text-emerald-300"
                : "text-white/35 group-hover:text-white/70"
          }
        `}
      >
        {icon}
      </span>
      <span className="w-full text-left">{label}</span>
    </button>
  );
};

export default MenuItem;

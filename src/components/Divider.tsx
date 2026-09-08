interface DividerProps {
  label: string;
  fontSize?: number;
}

const Divider = ({ label, fontSize = 10 }: DividerProps) => {
  return (
    <div className="py-2 px-4 flex flex-1 items-center gap-3">
      <div className="w-6 h-px bg-white/40" />
      <span
        className={`font-medium uppercase tracking-wider text-white/50`}
        style={{
          fontSize,
        }}
      >
        {label}
      </span>
      <div className="h-px flex-1 bg-white/40" />
    </div>
  );
};

export default Divider;

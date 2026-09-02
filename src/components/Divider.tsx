interface DividerProps {
  label: string;
}

const Divider = ({ label }: DividerProps) => {
  return (
    <div className="py-2 flex items-center gap-3">
      <div className="w-6 h-px bg-white/40" />
      <span className="text-[10px] font-medium uppercase tracking-wider text-white/50">
        {label}
      </span>
      <div className="h-px flex-1 bg-white/40" />
    </div>
  );
};

export default Divider;

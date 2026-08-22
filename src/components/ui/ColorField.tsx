export function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer group">
      <span className="text-xs text-white/60 group-hover:text-white/80 transition">{label}</span>
      <span className="flex items-center gap-2">
        <span className="text-[10px] text-white/35 font-mono uppercase">{value}</span>
        <span
          className="w-6 h-6 rounded-md border border-white/15 relative overflow-hidden shrink-0"
          style={{ background: value }}
        >
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute -inset-1 opacity-0 cursor-pointer"
          />
        </span>
      </span>
    </label>
  );
}

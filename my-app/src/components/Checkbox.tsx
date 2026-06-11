type Props = {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
};

export default function Checkbox({ checked, onChange, label }: Props) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden"
      />

      <div
        className={`
          w-5 h-5 border rounded flex items-center justify-center
          transition
          ${checked ? "bg-accent border-[#ea9c3f]" : "border-gray-400"}
        `}
      >
        {checked && (
          <svg
            className="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>

      {label && <span className="text-white">{label}</span>}
    </label>
  );
}

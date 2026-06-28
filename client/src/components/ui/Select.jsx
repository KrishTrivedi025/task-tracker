import { ChevronDown } from "lucide-react";

export default function Select({
  label,
  options,
  className = "",
  id,
  ...props
}) {
  const selectId = id || props.name;
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="mb-1.5 block text-sm font-medium text-ink-soft"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={`h-11 w-full appearance-none rounded-xl border border-line bg-white px-3.5 pr-10 text-sm text-ink focus-ring ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
        />
      </div>
    </div>
  );
}

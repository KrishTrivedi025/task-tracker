import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

export default function Select({
  label,
  options,
  value,
  onChange,
  name,
  className = "",
  id,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selectId = id || name;
  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const choose = (val) => {
    onChange({ target: { name, value: val } });
    setOpen(false);
  };

  return (
    <div className={`w-full ${className}`} ref={ref}>
      {label && (
        <label
          htmlFor={selectId}
          className="mb-1.5 block text-sm font-medium text-ink-soft"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <button
          type="button"
          id={selectId}
          onClick={() => setOpen((o) => !o)}
          className="flex h-11 w-full items-center justify-between rounded-xl border border-line bg-white px-3.5 text-sm text-ink shadow-sm transition hover:border-brand-500/40 focus:outline-none focus-ring"
        >
          <span>{selected?.label}</span>
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <ChevronDown size={16} className="text-ink-faint" />
          </motion.span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              role="listbox"
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.97 }}
              transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-50 mt-1.5 w-full overflow-hidden rounded-xl border border-line bg-white py-1 shadow-modal"
            >
              {options.map((opt) => {
                const active = opt.value === value;
                return (
                  <li key={opt.value} role="option" aria-selected={active}>
                    <button
                      type="button"
                      onClick={() => choose(opt.value)}
                      className={`flex w-full items-center justify-between px-3.5 py-2.5 text-sm transition-colors
                        ${active
                          ? "bg-brand-500/5 font-semibold text-brand-600"
                          : "text-ink hover:bg-canvas"
                        }`}
                    >
                      {opt.label}
                      {active && (
                        <Check size={14} className="shrink-0 text-brand-500" />
                      )}
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

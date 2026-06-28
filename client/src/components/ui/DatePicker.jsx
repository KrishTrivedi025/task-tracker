import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function buildCells(year, month) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function toDateStr(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

const CALENDAR_H = 340; // approx height of the popover

export default function DatePicker({ label, name, value, onChange }) {
  const today = new Date();
  const parsed = value ? new Date(value + "T00:00:00") : null;

  const [open, setOpen] = useState(false);
  const [popoverStyle, setPopoverStyle] = useState({});
  const [view, setView] = useState({
    year: parsed ? parsed.getFullYear() : today.getFullYear(),
    month: parsed ? parsed.getMonth() : today.getMonth(),
  });
  const triggerRef = useRef(null);

  // Sync calendar view when value changes externally (e.g. editing a task).
  useEffect(() => {
    if (value) {
      const d = new Date(value + "T00:00:00");
      setView({ year: d.getFullYear(), month: d.getMonth() });
    }
  }, [value]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (triggerRef.current && !triggerRef.current.contains(e.target)) {
        // Check if click is inside the portal calendar
        const portal = document.getElementById("datepicker-portal");
        if (portal && portal.contains(e.target)) return;
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const openCalendar = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;

    if (spaceBelow < CALENDAR_H) {
      // Not enough room below — render above
      setPopoverStyle({
        position: "fixed",
        bottom: window.innerHeight - rect.top + 6,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
      });
    } else {
      setPopoverStyle({
        position: "fixed",
        top: rect.bottom + 6,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
      });
    }
    setOpen((o) => !o);
  };

  const navigate = (delta) => {
    setView((v) => {
      const d = new Date(v.year, v.month + delta);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  };

  const selectDay = (day) => {
    onChange({ target: { name, value: toDateStr(view.year, view.month, day) } });
    setOpen(false);
  };

  const selectToday = () => {
    setView({ year: today.getFullYear(), month: today.getMonth() });
    onChange({
      target: { name, value: toDateStr(today.getFullYear(), today.getMonth(), today.getDate()) },
    });
    setOpen(false);
  };

  const clear = (e) => {
    e.stopPropagation();
    onChange({ target: { name, value: "" } });
  };

  const displayValue = parsed
    ? parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : null;

  const isToday = (day) =>
    day &&
    today.getDate() === day &&
    today.getMonth() === view.month &&
    today.getFullYear() === view.year;

  const isSelected = (day) =>
    day &&
    parsed &&
    parsed.getDate() === day &&
    parsed.getMonth() === view.month &&
    parsed.getFullYear() === view.year;

  const cells = buildCells(view.year, view.month);

  const calendar = (
    <div id="datepicker-portal" style={popoverStyle}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-72 rounded-2xl border border-line bg-white p-4 shadow-modal"
          >
            {/* Month navigation */}
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="rounded-lg p-1.5 text-ink-muted transition hover:bg-canvas hover:text-ink"
              >
                <ChevronLeft size={15} />
              </button>
              <span className="text-sm font-semibold text-ink">
                {MONTHS[view.month]} {view.year}
              </span>
              <button
                type="button"
                onClick={() => navigate(1)}
                className="rounded-lg p-1.5 text-ink-muted transition hover:bg-canvas hover:text-ink"
              >
                <ChevronRight size={15} />
              </button>
            </div>

            {/* Day-of-week headers */}
            <div className="mb-1 grid grid-cols-7">
              {DAYS.map((d) => (
                <div
                  key={d}
                  className="py-1 text-center text-[10px] font-bold uppercase tracking-widest text-ink-faint"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-y-0.5">
              {cells.map((day, i) => (
                <div key={i} className="flex items-center justify-center">
                  {day ? (
                    <button
                      type="button"
                      onClick={() => selectDay(day)}
                      className={`h-8 w-8 rounded-full text-sm font-medium transition
                        ${isSelected(day)
                          ? "bg-brand-600 text-white shadow-sm hover:bg-brand-500"
                          : isToday(day)
                          ? "ring-2 ring-brand-500/50 text-brand-600 hover:bg-brand-500/10"
                          : "text-ink hover:bg-canvas"
                        }`}
                    >
                      {day}
                    </button>
                  ) : null}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
              <button
                type="button"
                onClick={clear}
                className="text-xs font-medium text-ink-muted transition hover:text-ink"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={selectToday}
                className="text-xs font-semibold text-brand-600 transition hover:text-brand-500"
              >
                Today
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-ink-soft">{label}</label>
      )}
      <button
        ref={triggerRef}
        type="button"
        onClick={openCalendar}
        className="flex h-11 w-full items-center gap-2.5 rounded-xl border border-line bg-white px-3.5 text-sm shadow-sm transition hover:border-brand-500/40 focus:outline-none focus-ring"
      >
        <Calendar size={15} className="shrink-0 text-ink-faint" />
        <span className={`flex-1 text-left ${displayValue ? "text-ink" : "text-ink-faint"}`}>
          {displayValue || "Pick a date"}
        </span>
        {displayValue && (
          <span
            role="button"
            onClick={clear}
            className="rounded p-0.5 text-ink-faint transition hover:text-ink"
          >
            <X size={13} />
          </span>
        )}
      </button>

      {createPortal(calendar, document.body)}
    </div>
  );
}

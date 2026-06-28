// Shared metadata for task status & priority — single source of truth for
// labels, colors, and ordering used across the dashboard UI.

export const STATUS = {
  todo: { label: "To Do", dot: "bg-stone-400", chip: "bg-stone-100 text-ink-soft" },
  "in-progress": {
    label: "In Progress",
    dot: "bg-blue-500",
    chip: "bg-blue-50 text-blue-700",
  },
  done: {
    label: "Done",
    dot: "bg-emerald-500",
    chip: "bg-emerald-50 text-emerald-700",
  },
};

export const PRIORITY = {
  low: { label: "Low", chip: "bg-sky-50 text-sky-700 ring-sky-200" },
  medium: { label: "Medium", chip: "bg-amber-50 text-amber-700 ring-amber-200" },
  high: { label: "High", chip: "bg-rose-50 text-rose-700 ring-rose-200" },
};

export const STATUS_OPTIONS = Object.entries(STATUS).map(([value, m]) => ({
  value,
  label: m.label,
}));

export const PRIORITY_OPTIONS = Object.entries(PRIORITY).map(([value, m]) => ({
  value,
  label: m.label,
}));

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "dueDate", label: "Due date" },
  { value: "title", label: "Title (A–Z)" },
];

// Returns { text, overdue } for a due date, or null when none set.
export function formatDueDate(dueDate) {
  if (!dueDate) return null;
  const date = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const overdue = date < today;
  const text = date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
  });
  return { text, overdue };
}

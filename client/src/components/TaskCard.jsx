import { motion } from "framer-motion";
import { Pencil, Trash2, Calendar, Check } from "lucide-react";
import { PriorityBadge, StatusBadge } from "./ui/Badge.jsx";
import { formatDueDate, STATUS } from "../lib/taskMeta.js";

// Cycle status on quick-toggle: todo → in-progress → done → todo
const NEXT_STATUS = {
  todo: "in-progress",
  "in-progress": "done",
  done: "todo",
};

export default function TaskCard({ task, onEdit, onDelete, onToggleStatus }) {
  const due = formatDueDate(task.dueDate);
  const isDone = task.status === "done";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      whileHover={{ y: -3 }}
      className="group relative flex flex-col rounded-2xl border border-line bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div className="flex items-start gap-3">
        {/* Quick status toggle */}
        <button
          onClick={() => onToggleStatus(task, NEXT_STATUS[task.status])}
          title={`Mark as ${STATUS[NEXT_STATUS[task.status]].label}`}
          className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md border transition-colors ${
            isDone
              ? "border-emerald-500 bg-emerald-500 text-white"
              : "border-line hover:border-brand-500"
          }`}
        >
          {isDone && <Check size={13} strokeWidth={3} />}
        </button>

        <div className="min-w-0 flex-1">
          <h3
            className={`font-medium leading-snug text-ink ${
              isDone ? "line-through text-ink-faint" : ""
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="mt-1 line-clamp-2 text-sm text-ink-muted">
              {task.description}
            </p>
          )}
        </div>

        {/* Actions — reveal on hover */}
        <div className="flex flex-shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onEdit(task)}
            className="rounded-lg p-1.5 text-ink-muted transition-colors hover:bg-stone-100 hover:text-ink"
            aria-label="Edit task"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={() => onDelete(task)}
            className="rounded-lg p-1.5 text-ink-muted transition-colors hover:bg-rose-50 hover:text-rose-600"
            aria-label="Delete task"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <StatusBadge status={task.status} />
        <PriorityBadge priority={task.priority} />
        {due && (
          <span
            className={`ml-auto inline-flex items-center gap-1 text-xs font-medium ${
              due.overdue && !isDone ? "text-rose-600" : "text-ink-faint"
            }`}
          >
            <Calendar size={13} />
            {due.text}
          </span>
        )}
      </div>
    </motion.div>
  );
}

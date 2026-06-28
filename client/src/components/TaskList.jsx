import { AnimatePresence, motion } from "framer-motion";
import { ClipboardList } from "lucide-react";
import TaskCard from "./TaskCard.jsx";

function SkeletonCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-white p-5 shadow-card">
      <div className="flex gap-3">
        <div className="h-5 w-5 rounded-md bg-stone-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 rounded bg-stone-200" />
          <div className="h-3 w-full rounded bg-stone-100" />
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <div className="h-5 w-20 rounded-full bg-stone-100" />
        <div className="h-5 w-16 rounded-full bg-stone-100" />
      </div>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
}

function EmptyState({ filtered }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-white/50 py-20 text-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        <ClipboardList size={26} />
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-ink">
        {filtered ? "No matching tasks" : "No tasks yet"}
      </h3>
      <p className="mt-1 max-w-xs text-sm text-ink-muted">
        {filtered
          ? "Try adjusting your filters or search."
          : "Create your first task to get started."}
      </p>
    </motion.div>
  );
}

export default function TaskList({
  tasks,
  loading,
  filtered,
  onEdit,
  onDelete,
  onToggleStatus,
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="grid grid-cols-1">
        <EmptyState filtered={filtered} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleStatus={onToggleStatus}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

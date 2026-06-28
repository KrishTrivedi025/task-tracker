import { PRIORITY, STATUS } from "../../lib/taskMeta.js";

export function PriorityBadge({ priority }) {
  const meta = PRIORITY[priority] || PRIORITY.medium;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${meta.chip}`}
    >
      {meta.label}
    </span>
  );
}

export function StatusBadge({ status }) {
  const meta = STATUS[status] || STATUS.todo;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${meta.chip}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
}

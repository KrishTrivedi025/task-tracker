import { Search, X } from "lucide-react";
import Select from "./ui/Select.jsx";
import {
  PRIORITY_OPTIONS,
  SORT_OPTIONS,
  STATUS_OPTIONS,
} from "../lib/taskMeta.js";

const withAll = (options, allLabel) => [
  { value: "all", label: allLabel },
  ...options,
];

export default function FilterBar({ filters, onChange }) {
  const set = (key) => (e) => onChange({ ...filters, [key]: e.target.value });

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Search */}
      <div className="relative flex-1">
        <Search
          size={16}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
        />
        <input
          type="text"
          placeholder="Search tasks…"
          value={filters.search}
          onChange={set("search")}
          className="h-11 w-full rounded-xl border border-line bg-white pl-10 pr-9 text-sm text-ink placeholder:text-ink-faint focus-ring"
        />
        {filters.search && (
          <button
            onClick={() => onChange({ ...filters, search: "" })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 sm:flex sm:w-auto">
        <div className="w-full sm:w-36">
          <Select
            name="status"
            value={filters.status}
            onChange={set("status")}
            options={withAll(STATUS_OPTIONS, "All statuses")}
          />
        </div>
        <div className="w-full sm:w-36">
          <Select
            name="priority"
            value={filters.priority}
            onChange={set("priority")}
            options={withAll(PRIORITY_OPTIONS, "All priorities")}
          />
        </div>
        <div className="w-full sm:w-40">
          <Select
            name="sort"
            value={filters.sort}
            onChange={set("sort")}
            options={SORT_OPTIONS}
          />
        </div>
      </div>
    </div>
  );
}

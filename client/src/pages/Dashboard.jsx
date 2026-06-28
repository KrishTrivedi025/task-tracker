import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import TaskList from "../components/TaskList.jsx";
import TaskForm from "../components/TaskForm.jsx";
import ConfirmDialog from "../components/ConfirmDialog.jsx";
import FilterBar from "../components/FilterBar.jsx";
import Button from "../components/ui/Button.jsx";
import useDebounce from "../hooks/useDebounce.js";
import * as taskApi from "../api/tasks.js";

const DEFAULT_FILTERS = {
  search: "",
  status: "all",
  priority: "all",
  sort: "newest",
};

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const debouncedSearch = useDebounce(filters.search, 350);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deletingBusy, setDeletingBusy] = useState(false);

  const isFiltered =
    debouncedSearch !== "" ||
    filters.status !== "all" ||
    filters.priority !== "all";

  const loadTasks = useCallback(
    async ({ silent = false } = {}) => {
      if (!silent) setLoading(true);
      try {
        const data = await taskApi.fetchTasks({
          search: debouncedSearch || undefined,
          status: filters.status,
          priority: filters.priority,
          sort: filters.sort,
        });
        setTasks(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        if (!silent) setLoading(false);
      }
    },
    [debouncedSearch, filters.status, filters.priority, filters.sort]
  );

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  // Create or update — updates local state from the API response (no reload).
  const handleSubmit = async (payload) => {
    if (editing) {
      await taskApi.updateTask(editing._id, payload);
      toast.success("Task updated");
    } else {
      await taskApi.createTask(payload);
      toast.success("Task created");
    }
    // Resync so the new/updated task respects active filters and sort order.
    loadTasks({ silent: true });
  };

  const handleToggleStatus = async (task, nextStatus) => {
    // optimistic update for instant feedback
    setTasks((prev) =>
      prev.map((t) => (t._id === task._id ? { ...t, status: nextStatus } : t))
    );
    try {
      await taskApi.updateTask(task._id, {
        title: task.title,
        status: nextStatus,
      });
      loadTasks({ silent: true }); // keep status filter consistent
    } catch (err) {
      setTasks((prev) => prev.map((t) => (t._id === task._id ? task : t))); // revert
      toast.error(err.message);
    }
  };

  const confirmDelete = async () => {
    setDeletingBusy(true);
    try {
      await taskApi.deleteTask(deleting._id);
      setTasks((prev) => prev.filter((t) => t._id !== deleting._id));
      toast.success("Task deleted");
      setDeleting(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeletingBusy(false);
    }
  };

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = (task) => {
    setEditing(task);
    setFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-ink">
              Your tasks
            </h1>
            <p className="mt-1 text-sm text-ink-muted">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
              {isFiltered ? " shown" : ""}
            </p>
          </div>
          <Button onClick={openCreate}>
            <Plus size={18} />
            New task
          </Button>
        </div>

        <FilterBar filters={filters} onChange={setFilters} />

        <TaskList
          tasks={tasks}
          loading={loading}
          filtered={isFiltered}
          onEdit={openEdit}
          onDelete={setDeleting}
          onToggleStatus={handleToggleStatus}
        />
      </main>

      <TaskForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        task={editing}
      />

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={confirmDelete}
        loading={deletingBusy}
        title="Delete task"
        message={`"${deleting?.title}" will be permanently removed. This cannot be undone.`}
      />
    </div>
  );
}

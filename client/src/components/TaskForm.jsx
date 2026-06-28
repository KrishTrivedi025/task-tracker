import { useEffect, useState } from "react";
import Modal from "./ui/Modal.jsx";
import Input from "./ui/Input.jsx";
import Select from "./ui/Select.jsx";
import DatePicker from "./ui/DatePicker.jsx";
import Button from "./ui/Button.jsx";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../lib/taskMeta.js";

const empty = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  dueDate: "",
};

// Format an ISO date to yyyy-mm-dd for <input type="date">
const toDateInput = (d) => (d ? new Date(d).toISOString().slice(0, 10) : "");

export default function TaskForm({ open, onClose, onSubmit, task }) {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // Hydrate form when opening for edit, reset when creating.
  useEffect(() => {
    if (open) {
      setForm(
        task
          ? {
              title: task.title || "",
              description: task.description || "",
              status: task.status || "todo",
              priority: task.priority || "medium",
              dueDate: toDateInput(task.dueDate),
            }
          : empty
      );
      setErrors({});
    }
  }, [open, task]);

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      setErrors({ title: "Title is required" });
      return;
    }
    setSaving(true);
    try {
      await onSubmit({
        ...form,
        title: form.title.trim(),
        dueDate: form.dueDate || null,
      });
      onClose();
    } catch {
      // error toast handled by caller
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} title={task ? "Edit task" : "New task"}>
      <form onSubmit={submit} className="space-y-4" noValidate>
        <Input
          label="Title"
          name="title"
          placeholder="What needs to be done?"
          value={form.title}
          onChange={onChange}
          error={errors.title}
          autoFocus
        />
        <div>
          <label
            htmlFor="description"
            className="mb-1.5 block text-sm font-medium text-ink-soft"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            placeholder="Add more detail (optional)"
            value={form.description}
            onChange={onChange}
            className="w-full resize-none rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus-ring"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Status"
            name="status"
            value={form.status}
            onChange={onChange}
            options={STATUS_OPTIONS}
          />
          <Select
            label="Priority"
            name="priority"
            value={form.priority}
            onChange={onChange}
            options={PRIORITY_OPTIONS}
          />
        </div>
        <DatePicker
          label="Due date"
          name="dueDate"
          value={form.dueDate}
          onChange={onChange}
        />
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" loading={saving}>
            {task ? "Save changes" : "Create task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

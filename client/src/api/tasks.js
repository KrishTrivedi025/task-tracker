import api from "./axios.js";

// Task REST endpoints. Filters object → query string handled by axios `params`.
export const fetchTasks = (filters = {}) =>
  api.get("/tasks", { params: filters }).then((r) => r.data);

export const createTask = (data) =>
  api.post("/tasks", data).then((r) => r.data);

export const updateTask = (id, data) =>
  api.put(`/tasks/${id}`, data).then((r) => r.data);

export const deleteTask = (id) =>
  api.delete(`/tasks/${id}`).then((r) => r.data);

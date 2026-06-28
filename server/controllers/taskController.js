import Task from "../models/Task.js";

// @route   GET /api/tasks
// @desc    List the authenticated user's tasks, with optional filter/search/sort
// @query   status, priority, search, sort
export const getTasks = async (req, res, next) => {
  try {
    const { status, priority, search, sort } = req.query;

    const query = { user: req.user._id };

    if (status && status !== "all") query.status = status;
    if (priority && priority !== "all") query.priority = priority;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Sort options
    const sortMap = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      dueDate: { dueDate: 1 },
      title: { title: 1 },
    };
    const sortBy = sortMap[sort] || sortMap.newest;

    const tasks = await Task.find(query).sort(sortBy);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// @route   GET /api/tasks/:id
export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    next(error);
  }
};

// @route   POST /api/tasks
export const createTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate: dueDate || null,
      user: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

// @route   PUT /api/tasks/:id
export const updateTask = async (req, res, next) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate || null;

    const updated = await task.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

// @route   DELETE /api/tasks/:id
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted", id: req.params.id });
  } catch (error) {
    next(error);
  }
};

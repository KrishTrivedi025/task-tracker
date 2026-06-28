// Central error handler — keeps controllers clean of try/catch boilerplate.
export const notFound = (req, res, next) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

export const errorHandler = (err, req, res, next) => {
  let status = err.statusCode || 500;
  let message = err.message || "Server error";

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    status = 400;
    message = "Invalid resource id";
  }

  // Mongoose duplicate key (e.g. email already registered)
  if (err.code === 11000) {
    status = 409;
    message = "A record with that value already exists";
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    status = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  res.status(status).json({
    message,
    ...(process.env.NODE_ENV === "production" ? {} : { stack: err.stack }),
  });
};

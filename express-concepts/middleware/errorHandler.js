export class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "APIError";
  }
}

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const globalErrorHandler = (error, req, res, next) => {
  console.log(error.stack);
  if (error instanceof APIError) {
    return res.status(error.statusCode).json({
      status: "Error",
      message: error.message,
    });
  } else if (error.name === "validationError") {
    return res.statusCode(400).json({
      status: "error",
      message: "validation error",
    });
  } else {
    return res.statusCode(500).json({
      status: "error",
      message: "An unexpected error",
    });
  }
};

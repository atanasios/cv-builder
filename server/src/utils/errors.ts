export class AppError extends Error {
  constructor(public code: number, public status: string, message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = "The server cannot process the request due to client error.") {
    super(400, "Bad Request", message);
  }
}

export type ValidationErrors = { field: string; message: string }[];

export class ValidationError extends AppError {
  constructor(
    message = "Validation failed for the input data.",
    public errors: ValidationErrors = []
  ) {
    super(400, "Validation Error", message);
    this.errors = errors.length ? errors : [{ field: "unknown", message: "Invalid input." }];
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "The client must authenticate itself to get the requested response.") {
    super(401, "Unauthorized", message);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Access denied. You do not have permission to perform this action.") {
    super(403, "Forbidden", message);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "The requested resource could not be found.") {
    super(404, "Not Found", message);
  }
}

export class DuplicationError extends AppError {
  constructor(message = "The resource already exists and cannot be duplicated.") {
    super(409, "Conflict", message);
  }
}

export class URITooLongError extends AppError {
  constructor(message = "The requested URI is too long for the server to process.") {
    super(414, "URI Too Long", message);
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message = "The client has sent too many requests in a given amount of time.") {
    super(429, "Too Many Requests", message);
  }
}

export class DatabaseError extends AppError {
  constructor(message = "An unexpected database error occurred. Please try again later.") {
    super(500, "Internal Server Error", message);
  }
}

export class InternalServerError extends AppError {
  constructor(message = "An unexpected error occurred. Please try again later.") {
    super(500, "Internal Server Error", message);
  }
}

export const Errors = Object.freeze({
  AppError,
  BadRequestError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  DuplicationError,
  URITooLongError,
  TooManyRequestsError,
  DatabaseError,
  InternalServerError,
});

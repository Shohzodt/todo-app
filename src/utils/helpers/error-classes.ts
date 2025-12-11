import { StatusCodes } from "../constants/status-codes";

// ============================================================================
// Custom Error Classes (Optional - for throwing custom errors)
// ============================================================================

/**
 * Custom error class for application-specific errors
 */
export class AppError extends Error {
    constructor(
        public message: string,
        public statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR
    ) {
        super(message);
        this.name = 'AppError';
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Convenience error classes
 */
export class NotFoundError extends AppError {
    constructor(message: string = 'Resource not found') {
        super(message, StatusCodes.NOT_FOUND);
        this.name = 'NotFoundError';
    }
}

export class BadRequestError extends AppError {
    constructor(message: string = 'Bad request') {
        super(message, StatusCodes.BAD_REQUEST);
        this.name = 'BadRequestError';
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = 'Unauthorized') {
        super(message, StatusCodes.UNAUTHORIZED);
        this.name = 'UnauthorizedError';
    }
}

export class ForbiddenError extends AppError {
    constructor(message: string = 'Forbidden') {
        super(message, StatusCodes.FORBIDDEN);
        this.name = 'ForbiddenError';
    }
}
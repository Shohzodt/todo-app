import { StatusCodes } from '../constants/status-codes';
import {
  isDuplicateKeyError,
  extractDuplicateField,
  isValidationError,
  extractValidationMessage,
  isCastError,
  isAppError
} from '../helpers/error-functions';

export interface ErrorResponse {
  message: string;
  statusCode: number;
}

/**
 * Map any error to a user-friendly message and appropriate HTTP status code
 */
export const mapError = (error: unknown): ErrorResponse => {
  // MongoDB Duplicate Key Error (E11000)
  if (isDuplicateKeyError(error)) {
    const field = extractDuplicateField(error);
    return {
      message: `${field} already exists`,
      statusCode: StatusCodes.CONFLICT,
    };
  }

  // MongoDB Validation Error
  if (isValidationError(error)) {
    return {
      message: extractValidationMessage(error),
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  // MongoDB Cast Error (invalid ObjectId, etc.)
  if (isCastError(error)) {
    return {
      message: 'Invalid data format',
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  // Custom application errors with status codes
  if (isAppError(error)) {
    return {
      message: error.message,
      statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  // Standard Error objects
  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }

  // Fallback for unknown error types
  return {
    message: 'An unexpected error occurred',
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
  };
};


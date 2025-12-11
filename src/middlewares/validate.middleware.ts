import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from 'zod';
import { errorResponse } from '../utils/handlers/api-response';
import { StatusCodes } from '../utils/constants/status-codes';

/**
 * Middleware to validate request data against a Zod schema
 */
export const validate = (schema: ZodType) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));

        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'Validation failed',
          errors: errorMessages,
        });
      }

      return errorResponse(
        res,
        'An unexpected error occurred during validation',
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  };
};

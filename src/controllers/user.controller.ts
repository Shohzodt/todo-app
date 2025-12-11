import { Request, Response } from 'express';
import { successResponse, errorResponse } from '../utils/handlers/api-response';
import { mapError } from '../utils/handlers/error-handler';
import * as userService from '../services/user.service';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    successResponse(res, users, 'Users retrieved successfully');
  } catch (error) {
    const { message, statusCode } = mapError(error);
    errorResponse(res, message, statusCode);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    // Validation is handled by Zod middleware
    const { name, email } = req.body;

    const newUser = await userService.createNewUser({ name, email });
    successResponse(res, newUser, 'User created successfully');
  } catch (error) {
    const { message, statusCode } = mapError(error);
    errorResponse(res, message, statusCode);
  }
};
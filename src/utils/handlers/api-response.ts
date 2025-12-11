import { Response } from 'express';
import { StatusCodes } from '../constants/status-codes';

export const successResponse = (res: Response, data: any, message: string = 'Success') => {
  return res.status(StatusCodes.OK).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (res: Response, message: string = 'Error', statusCode: number = StatusCodes.BAD_REQUEST) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

import { Response } from 'express';
import { StatusCodes } from '../constants/status-codes';

export const successResponse = (
  res: Response,
  data: any,
  message: string = 'Success',
  statusCode: number = StatusCodes.OK
) => {
  return res.status(statusCode).json({
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

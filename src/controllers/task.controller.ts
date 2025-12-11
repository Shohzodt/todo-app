import { Request, Response } from 'express';
import { successResponse, errorResponse } from '../utils/handlers/api-response';
import { mapError } from '../utils/handlers/error-handler';
import * as taskService from '../services/task.service';
import { StatusCodes } from '../utils/constants/status-codes';

// Get all tasks
export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await taskService.getAllTasks();
        successResponse(res, tasks, 'Tasks retrieved successfully');
    } catch (error) {
        const { message, statusCode } = mapError(error);
        errorResponse(res, message, statusCode);
    }
};

// Create a new task
export const createTask = async (req: Request, res: Response) => {
    try {
        // Validation is handled by Zod middleware
        const { title, description, completed } = req.body;

        const newTask = await taskService.createNewTask({ title, description, completed });
        successResponse(res, newTask, 'Task created successfully', StatusCodes.CREATED);
    } catch (error) {
        const { message, statusCode } = mapError(error);
        errorResponse(res, message, statusCode);
    }
};

// Get a single task by ID
export const getTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const task = await taskService.getTaskById(id);

        if (!task) {
            return errorResponse(res, 'Task not found', StatusCodes.NOT_FOUND);
        }

        successResponse(res, task, 'Task retrieved successfully');
    } catch (error) {
        const { message, statusCode } = mapError(error);
        errorResponse(res, message, statusCode);
    }
};

// Update a task by ID
export const updateTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;

        const updatedTask = await taskService.updateTaskById(id, {
            title,
            description,
            completed,
        });

        if (!updatedTask) {
            return errorResponse(res, 'Task not found', StatusCodes.NOT_FOUND);
        }

        successResponse(res, updatedTask, 'Task updated successfully');
    } catch (error) {
        const { message, statusCode } = mapError(error);
        errorResponse(res, message, statusCode);
    }
};

// Delete a task by ID
export const deleteTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedTask = await taskService.deleteTaskById(id);

        if (!deletedTask) {
            return errorResponse(res, 'Task not found', StatusCodes.NOT_FOUND);
        }

        successResponse(res, deletedTask, 'Task deleted successfully');
    } catch (error) {
        const { message, statusCode } = mapError(error);
        errorResponse(res, message, statusCode);
    }
};

// Toggle task completion status
export const toggleTask = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const task = await taskService.toggleTaskCompletion(id);

        if (!task) {
            return errorResponse(res, 'Task not found', StatusCodes.NOT_FOUND);
        }

        successResponse(res, task, 'Task status toggled successfully');
    } catch (error) {
        const { message, statusCode } = mapError(error);
        errorResponse(res, message, statusCode);
    }
};

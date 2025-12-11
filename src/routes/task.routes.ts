import { Router } from 'express';
import {
    getTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
    toggleTask,
} from '../controllers/task.controller';
import { validate } from '../middlewares/validate.middleware';
import {
    createTaskSchema,
    updateTaskSchema,
    getTaskSchema,
    deleteTaskSchema,
} from '../schemas/task.schema';

const router = Router();

// GET /tasks - Get all tasks
router.get('/', getTasks);

// POST /tasks - Create a new task
router.post('/', validate(createTaskSchema), createTask);

// GET /tasks/:id - Get a single task by ID
router.get('/:id', validate(getTaskSchema), getTask);

// PUT /tasks/:id - Update a task by ID
router.put('/:id', validate(updateTaskSchema), updateTask);

// DELETE /tasks/:id - Delete a task by ID
router.delete('/:id', validate(deleteTaskSchema), deleteTask);

// PATCH /tasks/:id/toggle - Toggle task completion status
router.patch('/:id/toggle', validate(getTaskSchema), toggleTask);

export default router;

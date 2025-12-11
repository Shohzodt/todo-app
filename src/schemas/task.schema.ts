import { z } from 'zod';

/**
 * Task creation validation schema
 */
export const createTaskSchema = z.object({
    body: z.object({
        title: z
            .string({
                message: 'Title is required',
            })
            .min(1, 'Title must not be empty')
            .max(200, 'Title must not exceed 200 characters')
            .trim(),
        description: z
            .string()
            .max(1000, 'Description must not exceed 1000 characters')
            .trim()
            .optional(),
        completed: z
            .boolean()
            .optional()
            .default(false),
    }),
});

/**
 * Task update validation schema
 */
export const updateTaskSchema = z.object({
    body: z.object({
        title: z
            .string()
            .min(1, 'Title must not be empty')
            .max(200, 'Title must not exceed 200 characters')
            .trim()
            .optional(),
        description: z
            .string()
            .max(1000, 'Description must not exceed 1000 characters')
            .trim()
            .optional(),
        completed: z
            .boolean()
            .optional(),
    }),
    params: z.object({
        id: z.string({
            message: 'Task ID is required',
        }),
    }),
});

/**
 * Get task by ID validation schema
 */
export const getTaskSchema = z.object({
    params: z.object({
        id: z.string({
            message: 'Task ID is required',
        }),
    }),
});

/**
 * Delete task validation schema
 */
export const deleteTaskSchema = z.object({
    params: z.object({
        id: z.string({
            message: 'Task ID is required',
        }),
    }),
});

// Type exports for TypeScript
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type GetTaskInput = z.infer<typeof getTaskSchema>;
export type DeleteTaskInput = z.infer<typeof deleteTaskSchema>;

import { z } from 'zod';

/**
 * User creation validation schema
 */
export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({
        message: 'Name is required',
      })
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must not exceed 100 characters')
      .trim(),
    email: z
      .string({
        message: 'Email is required',
      })
      .email('Invalid email format')
      .toLowerCase()
      .trim(),
  }),
});

/**
 * User update validation schema
 */
export const updateUserSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name must not exceed 100 characters')
      .trim()
      .optional(),
    email: z
      .email('Invalid email format')
      .toLowerCase()
      .trim()
      .optional(),
  }),
  params: z.object({
    id: z.string({
      message: 'User ID is required',
    }),
  }),
});

/**
 * Get user by ID validation schema
 */
export const getUserSchema = z.object({
  params: z.object({
    id: z.string({
      message: 'User ID is required',
    }),
  }),
});

// Type exports for TypeScript
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type GetUserInput = z.infer<typeof getUserSchema>;

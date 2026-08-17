import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.email(),
  name: z.string().min(1),
  password: z.string().min(4),
});

export const updateUserSchema = z.object({
  email: z.email().optional(),
  name: z.string().min(1).optional(),
});

export const userResponseSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  name: z.string().min(1),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const userSummarySchema = userResponseSchema.pick({
  id: true,
  email: true,
  name: true,
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
export type UserSummary = z.infer<typeof userSummarySchema>;

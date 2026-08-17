import { z } from 'zod';
import { userSummarySchema } from '../user/user.schemas.js';
import { TaskPriority, TaskStatus } from '@taskforge/database';

export const taskStatusSchema = z.enum(TaskStatus);
export const taskPrioritySchema = z.enum(TaskPriority);

export const createTaskSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  assigneeId: z.uuid().optional(),
  priority: taskPrioritySchema.optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().optional(),
  assigneeId: z.uuid().optional(),
  status: taskStatusSchema.optional(),
  priority: taskPrioritySchema.optional(),
});

export const taskResponseSchema = z.object({
  id: z.uuid(),
  title: z.string().min(3),
  description: z.string().nullable(),
  status: taskStatusSchema,
  priority: taskPrioritySchema,
  createdAt: z.string(),
  updatedAt: z.string(),

  author: userSummarySchema,
  assignee: userSummarySchema.nullable(),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type TaskResponse = z.infer<typeof taskResponseSchema>;

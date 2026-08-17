import { z } from 'zod';
import { userSummarySchema } from '../user/user.schemas.js';

export const createCommentSchema = z.object({
  body: z.string().min(3),
});

export const updateCommentSchema = z.object({
  body: z.string().min(3),
});

export const commentResponseSchema = z.object({
  id: z.uuid(),
  taskId: z.uuid(),
  body: z.string().min(3),
  author: userSummarySchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
export type UpdateCommentInput = z.infer<typeof updateCommentSchema>;
export type CommentResponse = z.infer<typeof commentResponseSchema>;

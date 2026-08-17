import { z } from 'zod';
import { userSummarySchema } from '../user/user.schemas.js';
import { ProjectRole } from '@taskforge/database';

export const projectRoleSchema = z.enum(ProjectRole);

export const createProjectSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
});

export const updateProjectSchema = z.object({
  name: z.string().min(3).optional(),
  description: z.string().optional(),
});

export const projectMemberResponseSchema = z.object({
  id: z.uuid(),
  role: projectRoleSchema,
  joinedAt: z.string(),
  user: userSummarySchema,
});

export const projectResponseSchema = z.object({
  id: z.uuid(),
  name: z.string().min(3),
  description: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),

  owner: userSummarySchema,
  members: z.array(projectMemberResponseSchema),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
export type ProjectResponse = z.infer<typeof projectResponseSchema>;

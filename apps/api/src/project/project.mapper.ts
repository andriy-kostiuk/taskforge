import { type ProjectResponse } from '@taskforge/contracts';
import { type Prisma } from '@taskforge/database';

import { toUserSummary } from 'src/user/user.mapper';

export const projectDetailsInclude = {
  owner: true,
  members: {
    include: {
      user: true,
    },
  },
} satisfies Prisma.ProjectInclude;

export type ProjectDetails = Prisma.ProjectGetPayload<{
  include: typeof projectDetailsInclude;
}>;

export const toProjectResponse = (
  project: ProjectDetails
): ProjectResponse => ({
  id: project.id,
  name: project.name,
  description: project.description,
  createdAt: project.createdAt.toISOString(),
  updatedAt: project.updatedAt.toISOString(),

  owner: toUserSummary(project.owner),

  members: project.members.map((member) => ({
    id: member.id,
    role: member.role,
    joinedAt: member.joinedAt.toISOString(),
    user: toUserSummary(member.user),
  })),
});

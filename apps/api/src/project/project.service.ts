import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectInput, UpdateProjectInput } from '@taskforge/contracts';
import { ProjectRole } from '@taskforge/database';

import { PrismaService } from 'src/prisma/prisma.service';
import { toProjectResponse } from 'src/project/project.mapper';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  private getProject(projectId: string) {
    return this.prismaService.project.findUnique({
      where: {
        id: projectId,
      },
    });
  }

  async createProject(createProjectInput: CreateProjectInput, userId: string) {
    return this.prismaService.$transaction(async (tx) => {
      const { name, description } = createProjectInput;

      const project = await tx.project.create({
        data: {
          name,
          description,
          ownerId: userId,
        },
      });

      await tx.projectMember.create({
        data: {
          role: ProjectRole.OWNER,
          projectId: project.id,
          userId,
        },
      });

      return project;
    });
  }

  async getUserProjects(userId: string) {
    const projects = await this.prismaService.project.findMany({
      where: {
        members: {
          some: { userId },
        },
      },
      include: {
        owner: true,
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    return projects.map(toProjectResponse);
  }

  async updateProject(
    projectId: string,
    updateProjectInput: UpdateProjectInput,
    userId: string
  ) {
    const project = await this.getProject(projectId);

    if (!project) {
      throw new NotFoundException();
    }

    if (project.ownerId !== userId) {
      throw new ForbiddenException();
    }

    const updatedProject = await this.prismaService.project.update({
      where: { id: projectId },
      data: {
        ...updateProjectInput,
      },
      include: {
        owner: true,
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    return toProjectResponse(updatedProject);
  }

  async deleteProject(projectId: string, userId: string) {
    return this.prismaService.$transaction(async (tx) => {
      const project = await this.getProject(projectId);

      if (!project) {
        throw new NotFoundException();
      }

      if (project.ownerId !== userId) {
        throw new ForbiddenException();
      }

      await tx.projectMember.deleteMany({ where: { projectId } });

      return await tx.project.delete({ where: { id: projectId } });
    });
  }

  async getProjectDetails(projectId: string, userId: string) {
    const project = await this.prismaService.project.findUnique({
      where: { id: projectId, members: { some: { userId } } },
      include: {
        owner: true,
        members: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!project) {
      throw new NotFoundException();
    }

    return toProjectResponse(project);
  }
}

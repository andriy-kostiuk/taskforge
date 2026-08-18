import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  type CreateProjectInput,
  createProjectSchema,
  type UpdateProjectInput,
  updateProjectSchema,
} from '@taskforge/contracts';

import { AuthGuard } from 'src/auth/auth.guard';
import { type CurrentUserData } from 'src/auth/auth.types';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { ProjectService } from 'src/project/project.service';

@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  getMyProjects(@CurrentUser() user: CurrentUserData) {
    return this.projectService.getUserProjects(user.userId);
  }

  @Post()
  createProject(
    @CurrentUser() user: CurrentUserData,
    @Body(new ZodValidationPipe(createProjectSchema)) body: CreateProjectInput
  ) {
    return this.projectService.createProject(body, user.userId);
  }

  @Delete(':id')
  deleteProject(
    @CurrentUser() user: CurrentUserData,
    @Param('id') projectId: string
  ) {
    return this.projectService.deleteProject(projectId, user.userId);
  }

  @Patch(':id')
  updateProject(
    @CurrentUser() user: CurrentUserData,
    @Param('id') projectId: string,
    @Body(new ZodValidationPipe(updateProjectSchema)) body: UpdateProjectInput
  ) {
    return this.projectService.updateProject(projectId, body, user.userId);
  }
}

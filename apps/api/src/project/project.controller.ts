import { Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/auth/auth.guard';
import { type CurrentUserData } from 'src/auth/auth.types';
import { CurrentUser } from 'src/auth/current-user.decorator';
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
  createProject(@CurrentUser() user: CurrentUserData) {}
}

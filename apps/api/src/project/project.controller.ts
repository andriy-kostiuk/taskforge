import { Controller, Get } from '@nestjs/common';

import { ProjectService } from 'src/project/project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  getAll() {}
}

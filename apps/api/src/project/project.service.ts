import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  findAllByUser(userId: string) {
    return this.prismaService.project.findMany({
      where: {
        members: {
          some: { userId },
        },
      },
    });
  }
}

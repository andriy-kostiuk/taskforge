import { Injectable } from '@nestjs/common';
import { CreateUserInput } from '@taskforge/contracts';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  create(inputData: CreateUserInput) {
    const { name, email } = inputData;

    return this.prisma.user.create({ data: { name, email } });
  }
}

import { Injectable } from '@nestjs/common';
import {
  CreateUserInput,
  UpdateUserInput,
  UserResponse,
} from '@taskforge/contracts';
import argon2 from 'argon2';

import { toUserResponse } from './user.mapper';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<UserResponse[]> {
    const users = await this.prisma.user.findMany();

    return users.map(toUserResponse);
  }

  async create(inputData: CreateUserInput): Promise<UserResponse> {
    const { password, ...rest } = inputData;

    const createdPasswordHash = await argon2.hash(password);

    const user = await this.prisma.user.create({
      data: { ...rest, passwordHash: createdPasswordHash },
    });

    return toUserResponse(user);
  }

  update(id: string, data: UpdateUserInput) {
    return this.prisma.user.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}

import { Injectable } from '@nestjs/common';
import { UpdateUserInput, UserResponse } from '@taskforge/contracts';
import { User } from '@taskforge/database';

import { toUserResponse } from './user.mapper';
import { CreateUserWithPasswordHashInput } from './user.types';

import { PrismaService } from 'src/prisma/prisma.service';

type FindUserField = Pick<User, 'id'> | Pick<User, 'email'>;

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<UserResponse[]> {
    const users = await this.prisma.user.findMany();

    return users.map(toUserResponse);
  }

  async createWithPasswordHash(
    inputData: CreateUserWithPasswordHashInput
  ): Promise<UserResponse> {
    const user = await this.prisma.user.create({
      data: inputData,
    });

    return toUserResponse(user);
  }

  async findByField(
    fields: FindUserField,
    options?: { full?: false }
  ): Promise<UserResponse | null>;

  async findByField(
    fields: FindUserField,
    options: { full: true }
  ): Promise<User | null>;

  async findByField(
    fields: FindUserField,
    options?: { full?: boolean }
  ): Promise<UserResponse | User | null> {
    const user = await this.prisma.user.findUnique({ where: fields });

    if (!user) return null;

    if (options?.full) return user;

    return toUserResponse(user);
  }

  update(id: string, data: UpdateUserInput) {
    return this.prisma.user.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}

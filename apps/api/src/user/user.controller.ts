import { Body, Controller, Get, Post } from '@nestjs/common';
import { createUserSchema, type CreateUserInput } from '@taskforge/contracts';

import { UserService } from './user.service';

import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @Post()
  create(@Body(new ZodValidationPipe(createUserSchema)) body: CreateUserInput) {
    return this.userService.create(body);
  }
}

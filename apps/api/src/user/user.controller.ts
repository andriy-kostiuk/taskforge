import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  createUserSchema,
  type UpdateUserInput,
  updateUserSchema,
  type CreateUserInput,
} from '@taskforge/contracts';

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

  @Patch('/:id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateUserSchema)) body: UpdateUserInput
  ) {
    return this.userService.update(id, body);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}

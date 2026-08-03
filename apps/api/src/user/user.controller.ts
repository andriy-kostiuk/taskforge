import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { type UpdateUserInput, updateUserSchema } from '@taskforge/contracts';

import { UserService } from './user.service';

import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.findAll();
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

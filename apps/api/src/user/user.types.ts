import { type CreateUserInput } from '@taskforge/contracts';

export interface CreateUserWithPasswordHashInput extends Omit<
  CreateUserInput,
  'password'
> {
  passwordHash: string;
}

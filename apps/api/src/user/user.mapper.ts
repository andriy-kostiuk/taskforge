import { type UserSummary, type UserResponse } from '@taskforge/contracts';
import { type User } from '@taskforge/database';

export const toUserResponse = ({
  name,
  email,
  createdAt,
  updatedAt,
  id,
}: User): UserResponse => ({
  id,
  name,
  email,
  createdAt: createdAt.toISOString(),
  updatedAt: updatedAt.toISOString(),
});

export const toUserSummary = ({ name, email, id }: User): UserSummary => ({
  id,
  name,
  email,
});

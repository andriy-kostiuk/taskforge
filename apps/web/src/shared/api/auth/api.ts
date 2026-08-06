import type {
  CreateUserInput,
  LoginInput,
  UserResponse,
} from '@taskforge/contracts';

import { apiClient } from '../api-client';

export type LoginUserArgs = LoginInput;

export const loginUser = async (args: LoginUserArgs): Promise<void> => {
  await apiClient.post('/auth/login', args);
};

export const createUser = async (
  args: CreateUserInput
): Promise<UserResponse> => {
  const response = await apiClient.post<UserResponse>('/auth/register', args);
  return response.data;
};

export const refreshTokens = async (): Promise<void> => {
  await apiClient.post('/auth/refresh');
};

export const logout = async (): Promise<void> => {
  await apiClient.post('/auth/logout');
};

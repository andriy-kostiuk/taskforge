import type {
  CreateUserInput,
  LoginInput,
  UserResponse,
} from '@taskforge/contracts';

import { privateApiClient, publicApiClient } from '../api-client';

export type LoginUserArgs = LoginInput;

export const login = async (args: LoginUserArgs): Promise<void> => {
  await publicApiClient.post('/auth/login', args);
};

export const register = async (
  args: CreateUserInput
): Promise<UserResponse> => {
  const response = await publicApiClient.post<UserResponse>(
    '/auth/register',
    args
  );
  return response.data;
};

export const refreshSession = async (): Promise<void> => {
  await privateApiClient.post('/auth/refresh');
};

export const logout = async (): Promise<void> => {
  await privateApiClient.post('/auth/logout');
};

export const getMe = async (): Promise<UserResponse> => {
  return privateApiClient.get('/auth/me');
};

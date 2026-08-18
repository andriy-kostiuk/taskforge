import { ProjectResponse } from '@taskforge/contracts';

import { privateApiClient } from '../api-client';

export const getProjectsList = async () => {
  const response = await privateApiClient.get<ProjectResponse[]>('/projects');

  return response.data;
};

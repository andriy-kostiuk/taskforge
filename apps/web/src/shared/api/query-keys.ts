export const queryKeys = {
  auth: {
    me: ['auth', 'me'] as const,
  },
  projects: {
    list: ['projects', 'list'] as const,
    detail: (projectId: string) => ['projects', 'detail', projectId] as const,
  },
};

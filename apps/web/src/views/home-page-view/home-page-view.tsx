'use client';

import { useQuery } from '@tanstack/react-query';

import { Container } from '@/components/layout';
import { queryKeys } from '@/shared/api';
import { getProjectsList } from '@/shared/api/projects';

import {
  EmptyProjects,
  HomeHero,
  ProjectsOverview,
  ProjectStats,
  QuickActions,
} from './components';
import { HomePageSkeleton } from './home-page-skeleton';

export const HomePageView = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.projects.list,
    queryFn: getProjectsList,
  });

  if (isLoading) {
    return <HomePageSkeleton />;
  }

  if (data?.length === 0) {
    return <EmptyProjects />;
  }

  const projects = data ?? [];

  return (
    <section className="bg-linear-to-b from-background via-background to-muted/30 py-8 sm:py-10 lg:py-12">
      <Container className="space-y-6 sm:space-y-8">
        <HomeHero projectsCount={projects.length} />
        <ProjectStats projects={projects} />

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(18rem,0.9fr)]">
          <ProjectsOverview projects={projects} />
          <QuickActions />
        </div>
      </Container>
    </section>
  );
};

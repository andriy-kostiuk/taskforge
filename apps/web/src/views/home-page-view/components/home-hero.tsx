import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type HomeHeroProps = {
  projectsCount: number;
};

export const HomeHero = ({ projectsCount }: HomeHeroProps) => {
  return (
    <Card className="relative overflow-hidden border-border/70 bg-linear-to-br from-card via-card to-secondary/35 shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-linear-to-l from-muted/70 via-muted/20 to-transparent lg:block" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-border/80" />

      <CardHeader className="max-w-3xl gap-4 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="inline-flex w-fit items-center rounded-full border border-border/70 bg-background px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Dashboard
        </div>

        <div className="space-y-3">
          <CardTitle className="text-3xl leading-tight sm:text-4xl lg:text-5xl">
            Welcome back
          </CardTitle>

          <CardDescription className="max-w-2xl text-base leading-7 text-foreground/70 sm:text-lg">
            You have {projectsCount} active project
            {projectsCount === 1 ? '' : 's'} in motion. Pick up where you left
            off, review your workspace, or start a new one.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 px-6 pb-8 sm:flex-row sm:px-8 sm:pb-10 lg:px-10 lg:pb-12">
        <Button
          size="lg"
          render={<Link href="/projects/new" />}
          nativeButton={false}
        >
          Create project
        </Button>

        <Button variant="outline" size="lg">
          Review workspace
        </Button>
      </CardContent>
    </Card>
  );
};

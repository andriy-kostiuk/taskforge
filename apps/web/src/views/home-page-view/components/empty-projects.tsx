import Link from 'next/link';

import { Container } from '@/components/layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const EmptyProjects = () => {
  return (
    <section className="flex flex-1 items-center bg-linear-to-b from-background via-background to-muted/30 py-10 sm:py-14 lg:py-20">
      <Container>
        <Card className="relative overflow-hidden border-border/70 bg-linear-to-br from-card via-card to-muted/60 shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-linear-to-l from-secondary/50 via-muted/20 to-transparent lg:block" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-border/80" />

          <CardHeader className="max-w-3xl gap-4 px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
            <div className="inline-flex w-fit items-center rounded-full border border-border/70 bg-background px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Your workspace starts here
            </div>

            <div className="space-y-3">
              <CardTitle className="text-3xl leading-tight sm:text-4xl lg:text-5xl">
                Create your first project
              </CardTitle>

              <CardDescription className="max-w-2xl text-base leading-7 text-foreground/70 sm:text-lg">
                Once you create a project, this dashboard will show your tasks,
                upcoming deadlines, and team activity in one focused place.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-8 sm:px-8 sm:pb-10 lg:px-10 lg:pb-12">
            <Button
              size="lg"
              render={<Link href="/projects/new" />}
              nativeButton={false}
            >
              Create project
            </Button>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
};

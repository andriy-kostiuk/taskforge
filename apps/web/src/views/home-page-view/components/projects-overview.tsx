import { ProjectResponse } from '@taskforge/contracts';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type ProjectsOverviewProps = {
  projects: ProjectResponse[];
};

const formatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export const ProjectsOverview = ({ projects }: ProjectsOverviewProps) => {
  return (
    <Card className="border-border/70 shadow-sm">
      <CardHeader className="gap-3 border-b border-border/70 pb-6">
        <CardTitle className="text-2xl sm:text-3xl">Recent projects</CardTitle>
        <CardDescription className="max-w-2xl text-sm leading-6 sm:text-base">
          Jump back into your active workspaces, see who is involved, and keep
          momentum without digging through navigation first.
        </CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4 pt-6 lg:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.id}
            className="flex h-full flex-col justify-between rounded-2xl border border-border/70 bg-muted/30 p-5"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {project.name}
                  </h3>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {project.description?.trim() ||
                      'No description yet. Add a short brief so the team knows the project focus.'}
                  </p>
                </div>

                <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  {project.members.length} member
                  {project.members.length === 1 ? '' : 's'}
                </span>
              </div>

              <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em]">
                    Project owner
                  </p>
                  <p className="mt-1 text-foreground">{project.owner.name}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.16em]">
                    Updated
                  </p>
                  <p className="mt-1 text-foreground">
                    {formatter.format(new Date(project.updatedAt))}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-border/60 pt-4">
              <div className="text-sm text-muted-foreground">
                Created {formatter.format(new Date(project.createdAt))}
              </div>

              <Button variant="outline" size="sm">
                Open project
              </Button>
            </div>
          </article>
        ))}
      </CardContent>
    </Card>
  );
};

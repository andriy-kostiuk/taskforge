import { ProjectResponse } from '@taskforge/contracts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type ProjectStatsProps = {
  projects: ProjectResponse[];
};

const formatUpdatedLabel = (updatedAt: string) => {
  const formatter = new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
  });

  return formatter.format(new Date(updatedAt));
};

export const ProjectStats = ({ projects }: ProjectStatsProps) => {
  const totalProjects = projects.length;
  const totalMembers = new Set(
    projects.flatMap((project) => project.members.map((member) => member.user.id))
  ).size;
  const latestUpdate =
    projects
      .map((project) => project.updatedAt)
      .sort((left, right) => right.localeCompare(left))[0] ?? null;

  const stats = [
    {
      label: 'Active projects',
      value: totalProjects.toString(),
      description:
        totalProjects === 1 ? 'One workspace in motion' : 'Workspaces in motion',
    },
    {
      label: 'Collaborators',
      value: totalMembers.toString(),
      description:
        totalMembers === 1
          ? 'One teammate across projects'
          : 'Teammates across projects',
    },
    {
      label: 'Last update',
      value: latestUpdate ? formatUpdatedLabel(latestUpdate) : 'No activity',
      description: 'Most recent project change',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Card
          key={stat.label}
          className="border-border/70 bg-card/90 shadow-xs backdrop-blur-sm"
          size="sm"
        >
          <CardHeader className="gap-1">
            <CardDescription className="text-xs uppercase tracking-[0.16em]">
              {stat.label}
            </CardDescription>
            <CardTitle className="text-2xl sm:text-3xl">{stat.value}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

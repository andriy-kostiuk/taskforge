import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const actions = [
  {
    title: 'Create a fresh workspace',
    description:
      'Start a new project when you need a clean place for planning and execution.',
    href: '/projects/new',
    cta: 'Create project',
  },
  {
    title: 'Review your current stack',
    description:
      'Use the project cards on the left to check ownership, members, and recent updates.',
    href: '/',
    cta: 'Refresh view',
  },
];

export const QuickActions = () => {
  return (
    <Card className="border-border/70 shadow-sm">
      <CardHeader className="gap-3 border-b border-border/70 pb-6">
        <CardTitle className="text-2xl">Quick actions</CardTitle>
        <CardDescription className="text-sm leading-6 sm:text-base">
          Keep momentum by jumping into the next most useful step instead of
          hunting through menus.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-6">
        {actions.map((action) => (
          <div
            key={action.title}
            className="rounded-2xl border border-border/70 bg-muted/30 p-5"
          >
            <h3 className="text-base font-semibold tracking-tight">
              {action.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {action.description}
            </p>
            <Button
              className="mt-4"
              variant="outline"
              render={<Link href={action.href} />}
              nativeButton={false}
            >
              {action.cta}
            </Button>
          </div>
        ))}

        <div className="rounded-2xl border border-dashed border-border bg-background p-5">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Coming next
          </p>
          <p className="mt-3 text-sm leading-6 text-foreground/80">
            Tasks, due dates, and activity can land in this side panel next, so
            the dashboard stays useful as the product grows.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

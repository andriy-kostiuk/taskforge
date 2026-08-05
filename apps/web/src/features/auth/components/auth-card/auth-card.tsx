import type { PropsWithChildren, ReactNode } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface AuthCardProps extends PropsWithChildren {
  badge?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
}

export function AuthCard({
  badge = 'TaskForge',
  title,
  description,
  children,
}: AuthCardProps) {
  return (
    <Card className="overflow-hidden border border-border/70 bg-card/95 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.32)] backdrop-blur">
      <div className="h-1.5 w-full bg-linear-to-r from-primary via-primary/70 to-primary/20" />

      <CardHeader className="space-y-3 border-b border-border/60 bg-muted/30 pb-6">
        <div className="inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-[0.7rem] font-medium tracking-[0.18em] text-primary uppercase">
          {badge}
        </div>

        <div className="space-y-1.5">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            {title}
          </CardTitle>

          {description ? (
            <CardDescription className="max-w-sm text-sm leading-6">
              {description}
            </CardDescription>
          ) : null}
        </div>
      </CardHeader>

      <CardContent className="pt-6">{children}</CardContent>
    </Card>
  );
}

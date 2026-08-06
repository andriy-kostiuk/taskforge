import Link from 'next/link';
import type { ReactNode } from 'react';

import { Container } from '../container';

interface AppHeaderProps {
  brandHref: string;
  navigation: ReactNode;
}

export function AppHeader({ brandHref, navigation }: AppHeaderProps) {
  return (
    <header className="border-b border-border/70 bg-background/80 backdrop-blur">
      <Container className="flex min-h-16 items-center justify-between gap-6">
        <Link
          href={brandHref}
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          TaskForge
        </Link>

        <nav className="flex items-center gap-5 text-sm text-muted-foreground">
          {navigation}
        </nav>
      </Container>
    </header>
  );
}

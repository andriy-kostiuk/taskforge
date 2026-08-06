import Link from 'next/link';

import { Container } from './container';

export function PublicHeader() {
  return (
    <header className="border-b border-border/70 bg-background/80 backdrop-blur">
      <Container className="flex min-h-16 items-center justify-between gap-6">
        <Link
          href="/login"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          TaskForge
        </Link>

        <nav className="flex items-center gap-5 text-sm text-muted-foreground">
          <Link
            href="/login"
            className="transition-colors hover:text-foreground"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="transition-colors hover:text-foreground"
          >
            Register
          </Link>
        </nav>
      </Container>
    </header>
  );
}

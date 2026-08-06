import { Container } from './container';

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-background/80">
      <Container className="flex min-h-16 items-center justify-between gap-4 py-4 text-sm text-muted-foreground">
        <p>TaskForge</p>
        <p>Plan clearly. Ship consistently.</p>
      </Container>
    </footer>
  );
}

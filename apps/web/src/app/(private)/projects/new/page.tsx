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

export default function NewProjectPage() {
  return (
    <section className="flex flex-1 items-center bg-linear-to-b from-background via-background to-muted/30 py-10 sm:py-14 lg:py-20">
      <Container>
        <Card className="mx-auto max-w-3xl border-border/70 bg-linear-to-br from-card via-card to-secondary/40 shadow-sm">
          <CardHeader className="gap-4 px-6 py-8 sm:px-8 sm:py-10">
            <div className="inline-flex w-fit items-center rounded-full border border-border/70 bg-muted px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Coming next
            </div>

            <div className="space-y-3">
              <CardTitle className="text-3xl leading-tight sm:text-4xl">
                Project creation is the next step
              </CardTitle>

              <CardDescription className="max-w-2xl text-base leading-7 text-foreground/70 sm:text-lg">
                We have the empty dashboard state in place. Next we can build
                the create-project flow and connect it to your API.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-8 sm:px-8 sm:pb-10">
            <Button size="lg" render={<Link href="/" />}>
              Back to dashboard
            </Button>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
}

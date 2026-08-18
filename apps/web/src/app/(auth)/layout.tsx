import type { PropsWithChildren } from 'react';

import { Container } from '@/components/layout';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <main className="flex flex-1 flex-col">
        <Container className="my-auto max-w-2xl py-4" hasMaxWidth={false}>
          {children}
        </Container>
      </main>
    </>
  );
}

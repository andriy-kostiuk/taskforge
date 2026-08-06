import { Container, Footer, PublicHeader } from '@/components/layout';
import type { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <>
      <PublicHeader />
      <main className="flex flex-1 flex-col">
        <Container className="my-auto max-w-2xl py-4" hasMaxWidth={false}>
          {children}
        </Container>
      </main>
      <Footer />
    </>
  );
}

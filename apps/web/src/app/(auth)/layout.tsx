import { Container } from '@/components/layout';
import type { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <Container className="my-auto max-w-2xl py-4" hasMaxWidth={false}>
      {children}
    </Container>
  );
}

import Link from 'next/link';

import { LogoutButton } from '@/features/auth';

import { AppHeader } from './app-header';

export function PrivateHeader() {
  return (
    <AppHeader
      brandHref="/"
      navigation={
        <>
          <Link href="/" className="transition-colors hover:text-foreground">
            Dashboard
          </Link>

          <LogoutButton />
        </>
      }
    />
  );
}

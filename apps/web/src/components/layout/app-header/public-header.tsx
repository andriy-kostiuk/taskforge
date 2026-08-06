import Link from 'next/link';

import { AppHeader } from './app-header';

export function PublicHeader() {
  return (
    <AppHeader
      brandHref="/login"
      navigation={
        <>
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
        </>
      }
    />
  );
}

import { cookies } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';

import { Footer, PrivateHeader } from '@/components/layout';
import { ROUTES } from '@/constants';

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get('refreshToken');

  if (!refreshToken) {
    redirect(ROUTES.Login, RedirectType.replace);
  }

  return (
    <>
      <PrivateHeader />
      <main className="flex flex-1 flex-col">{children}</main>

      <Footer />
    </>
  );
}

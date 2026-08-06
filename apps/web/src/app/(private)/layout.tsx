import { PrivateHeader } from '@/components/layout';
import { cookies } from 'next/headers';
import { redirect, RedirectType } from 'next/navigation';

export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get('refreshToken');

  if (!refreshToken) {
    redirect('/login', RedirectType.replace);
  }

  return (
    <>
      <PrivateHeader />
      <main className="flex flex-1 flex-col">{children}</main>
    </>
  );
}

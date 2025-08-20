
'use client';

import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // The admin login page should not have the dashboard layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // You can add a dashboard-specific layout here if needed in the future
  return <>{children}</>;
}

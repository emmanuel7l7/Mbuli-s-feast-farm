
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // The admin login page should not have the dashboard layout or auth check
    if (pathname === '/admin/login') {
      setIsAuthenticated(true); // Allow login page to render
      return;
    }

    // In a real app, you'd have a proper auth check.
    // For this prototype, we'll use localStorage to simulate a session.
    const session = localStorage.getItem('admin_auth');
    if (session !== 'true') {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  // Render nothing or a loading spinner while checking auth
  if (!isAuthenticated) {
    return null;
  }
  
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // You can add a dashboard-specific layout here if needed in the future
  return <>{children}</>;
}

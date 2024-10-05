'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthState } from '@/utils/Route Protection/useAuthState';

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAuthState();

  useEffect(() => {
    if (!loading) {
      if (user && (window.location.pathname === '/login' || window.location.pathname === '/register')) {
        router.replace('/');
      } else if (!user && window.location.pathname.startsWith('/dashboard')) {
        router.replace('/login');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Or your custom loading component
  }

  return <>{children}</>;
}
'use client';

import { HomePageLoading } from '@/utils/Loading Spinner/Loading Skeleton/Skeleton';
import { useAuthState } from '@/utils/Route Protection/useAuthState';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
    return <HomePageLoading />; // Or your custom loading component
  }

  return <>{children}</>;
}
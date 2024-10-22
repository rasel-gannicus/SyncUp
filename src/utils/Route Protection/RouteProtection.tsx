"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { HomePageLoading } from '../Loading Spinner/Loading Skeleton/Skeleton';
import { useAuthState } from './useAuthState';

export function withAuthProtection(WrappedComponent: React.ComponentType, redirectPath = '/login') {
  return function WithAuthProtection(props: any) {
    const router = useRouter();
    const { user, loading } = useAuthState();

    useEffect(() => {
      if (!loading && !user) {
        router.replace(redirectPath);
      }
    }, [user, loading, router]);

    if (loading) {
      return <HomePageLoading />;
    }

    if (user) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };
}

export function withAuthRedirect(WrappedComponent: React.ComponentType, redirectPath = '/') {
  return function WithAuthRedirect(props: any) {
    const router = useRouter();
    const { user, loading } = useAuthState();

    useEffect(() => {
      if (!loading && user) {
        router.replace(redirectPath);
      }
    }, [user, loading, router]);

    if (loading) {
      return <HomePageLoading />;
    }

    if (!user) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };
}
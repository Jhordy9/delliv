import React, { ComponentType, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';

export const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  return function WithAuthComponent(props: P) {
    const router = useRouter();
    const isAuthenticated = useSelector(
      (state: RootState) => state.auth.isAuthenticated
    );

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/');
      }
    }, [isAuthenticated, router]);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };
};

// components/ProtectedRoute.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;

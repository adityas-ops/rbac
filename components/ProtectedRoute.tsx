import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Ensure this logic runs only on the client
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const user = localStorage.getItem('user');

    if (!isAuthenticated || !user) {
      router.push('/login');
    } else {
      setIsAuthorized(true); 
    }
  }, [router]);

  if (!isAuthorized) {
    return null; 
  }

  return <>{children}</>;
};

export default ProtectedRoute;

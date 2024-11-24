// pages/login.tsx
import React from 'react';
import LoginForm from '../components/LoginForm';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = (username: string, password: string) => {
    // Mock authentication logic
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('isAuthenticated', 'true');
      router.push('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;

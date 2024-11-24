// components/LoginForm.tsx
import React, { useState } from 'react';
import Button from './common/Button';

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Username</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-center">
        <Button type="submit">Login</Button>
      </div>
    </form>
  );
};

export default LoginForm;

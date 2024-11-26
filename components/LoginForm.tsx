// components/LoginForm.tsx
import React, { useState } from 'react';
import Button from './common/Button';
import Link from 'next/link';

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
    <form onSubmit={handleSubmit} className=" max-w-[300px] sm:max-w-lg w-full mx-auto  p-6   drop-shadow-2xl  rounded-md  bg-[#5882C1]/30 shadow-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-white">Admin Login</h2>
      <div className="mb-4">
        <label className="block text-white">Username</label>
        <input
          type="text"
          className="w-full  px-3 py-2  bg-gray-200 shadow-xl  rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-white">Password</label>
        <input
          type="password"
          className="w-full border px-3 py-2 bg-gray-200 rounded shadow-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-center">
        <Button className=" w-full text-xl font-semibold" type="submit">Login</Button>
      </div>
      <Link className='' href="/signin">
        <p className="block text-center z-50 py-[10px] text-white text-lg font-semibold  underline">
          Don&apos;t have an account? Sign up
        </p>
      </Link>
    </form>
  );
};

export default LoginForm;

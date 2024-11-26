// components/LoginForm.tsx
import React, { useState } from 'react';
import Button from './common/Button';

interface LoginFormProps {
  onLogin: (username: string, password: string, name:string,email:string) => void;
}

const SingupForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password, name,email);
    
  };

  return (
    <form onSubmit={handleSubmit} className=" z-40 max-w-[300px] sm:max-w-lg w-full mx-auto  p-6   drop-shadow-2xl  rounded-md  bg-[#5882C1]/30 shadow-2xl">
      <h2 className="text-2xl font-bold mb-1 text-center text-white">Please Sign up first!</h2>
      <p className="text-sm font-bold mb-4 text-center text-red-200"> Note: Only Admin can make you Admin to access Admin Page</p>
      <div className="mb-4">
        <label className="block text-white">Username</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white">name</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white">E mail</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-white">Password</label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-center">
        <Button className='w-full z-50' type="submit">SingUp</Button>
      </div>
    </form>
  );
};

export default SingupForm;

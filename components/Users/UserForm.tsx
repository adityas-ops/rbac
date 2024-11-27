import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface UserFormProps {
  initialData?: {
    name: string;
    email: string;
    roleId: string;
    status: string;
  };
  roles: { id: string; name: string }[];
  onSubmit: (data: { name: string; email: string; roleId: string; status: string }) => void;
  users: { email: string }[]; // Add this prop
}

const UserForm: React.FC<UserFormProps> = ({ initialData, roles, onSubmit, users }) => {
  const [email, setEmail] = useState(initialData?.email || '');
  const [name, setName] = useState(initialData?.name || '');
  const [roleId, setRoleId] = useState(initialData?.roleId || '1');
  const [status, setStatus] = useState(initialData?.status || 'Active');
  const [loginUsers, setLoginUsers] = useState<{ id: string; name: string; email: string }[]>([]);

  useEffect(() => {
    const fetchLoginUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5001/Login'); // Adjust URL if needed
        setLoginUsers(res.data);
      } catch (error) {
        console.error('Error fetching login users:', error);
      }
    };
    fetchLoginUsers();
  }, []);

  // Filter out emails that already have a role
  const availableEmails = loginUsers.filter(
    (loginUser) => !users?.some((user) => user.email === loginUser.email)
  );

  useEffect(() => {
    const selectedUser = loginUsers.find((user) => user.email === email);
    setName(selectedUser?.name || '');
  }, [email, loginUsers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, roleId, status });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Email</label>
        <div className="relative">
          <select
            className="w-full border border-black px-3 py-2 appearance-none relative rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          >
            <option value="">Select Email</option>
            {availableEmails.map((user) => (
              <option key={user.id} value={user.email}>
                {user.email}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      {name && (
        <div>
          <label className="block text-gray-700">Name</label>
          <div className="w-full border px-3 py-2 rounded bg-gray-100">{name}</div>
        </div>
      )}
      <div>
        <label className="block text-gray-700">Role</label>
        <div className="relative">
          <select
            className="w-full border border-black appearance-none px-3 py-2 rounded"
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      <div>
        <label className="block text-gray-700">Status</label>
        <div className="relative">
          <select
            className="w-full border appearance-none border-black px-3 py-2 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default UserForm;

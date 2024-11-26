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
}

const UserForm: React.FC<UserFormProps> = ({ initialData, roles, onSubmit }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [roleId, setRoleId] = useState(initialData?.roleId || '1');
  const [status, setStatus] = useState(initialData?.status || 'Active');
  const [loginUsers, setLoginUsers] = useState<{ id: string; name: string; email: string }[]>([]);

  useEffect(() => {
    // Fetch login data from API
    const fetchLoginUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5001/Login'); // Update the URL if needed
        setLoginUsers(res.data);
      } catch (error) {
        console.error('Error fetching login users:', error);
      }
    };

    fetchLoginUsers();
  }, []);

  // Update email when name changes
  useEffect(() => {
    const selectedUser = loginUsers.find((user) => user.name === name);
    setEmail(selectedUser?.email || '');
  }, [name, loginUsers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, roleId, status });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Name</label>
        <select
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        >
          <option value="">Select Name</option>
          {loginUsers.map((user) => (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded bg-gray-100"
          value={email}
          readOnly
        />
      </div>
      <div>
        <label className="block text-gray-700">Role</label>
        <select
          className="w-full border px-3 py-2 rounded"
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
      </div>
      <div>
        <label className="block text-gray-700">Status</label>
        <select
          className="w-full border px-3 py-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <div className="flex justify-end">
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Submit
        </button>
      </div>
    </form>
  );
};

export default UserForm;

// components/Users/UserForm.tsx
import React, { useState} from 'react';

interface UserFormProps {
  initialData?: {
    name: string;
    email: string;
    roleId: number;
    status: string;
  };
  roles: { id: number; name: string }[];
  onSubmit: (data: { name: string; email: string; roleId: number; status: string }) => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, roles, onSubmit }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [roleId, setRoleId] = useState(initialData?.roleId || 0);
  const [status, setStatus] = useState(initialData?.status || 'Active');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, roleId, status });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Role</label>
        <select
          className="w-full border px-3 py-2 rounded"
          value={roleId}
          onChange={(e) => setRoleId(Number(e.target.value))}
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

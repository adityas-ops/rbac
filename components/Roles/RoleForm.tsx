// components/Roles/RoleForm.tsx
import React, { useState } from 'react';

interface RoleFormProps {
  initialData?: {
    name: string;
    description: string;
    permissions: number[];
  };
  permissions: { id: number; name: string }[];
  onSubmit: (data: { name: string; description: string; permissions: number[] }) => void;
}

const RoleForm: React.FC<RoleFormProps> = ({ initialData, permissions, onSubmit }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>(initialData?.permissions || []);

  const handlePermissionChange = (id: number) => {
    setSelectedPermissions((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, permissions: selectedPermissions });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Role Name</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Description</label>
        <textarea
          className="w-full border px-3 py-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      <div>
        <label className="block text-gray-700">Permissions</label>
        <div className="flex flex-wrap">
          {permissions.map((perm) => (
            <label key={perm.id} className="mr-4">
              <input
                type="checkbox"
                checked={selectedPermissions.includes(perm.id)}
                onChange={() => handlePermissionChange(perm.id)}
                className="mr-1"
              />
              {perm.name}
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Submit
        </button>
      </div>
    </form>
  );
};

export default RoleForm;

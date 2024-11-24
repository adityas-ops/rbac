// components/Permissions/PermissionForm.tsx
import React, { useState } from 'react';

interface PermissionFormProps {
  initialData?: {
    name: string;
  };
  onSubmit: (data: { name: string }) => void;
}

const PermissionForm: React.FC<PermissionFormProps> = ({ initialData, onSubmit }) => {
  const [name, setName] = useState(initialData?.name || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Permission Name</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Submit
        </button>
      </div>
    </form>
  );
};

export default PermissionForm;

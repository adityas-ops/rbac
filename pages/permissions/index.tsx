// pages/permissions/index.tsx
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import PermissionTable from '../../components/Permissions/PermissionTable';
import PermissionModal from '../../components/Permissions/PermissionModal';
import Button from '../../components/common/Button';
import axios from 'axios';

interface Permission {
  id: number;
  name: string;
}

const PermissionsPage = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPermission, setEditingPermission] = useState<Permission | null>(null);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const res = await axios.get<Permission[]>('http://localhost:5001/permissions');
      setPermissions(res.data);
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  };

  const handleAdd = () => {
    setEditingPermission(null);
    setIsModalOpen(true);
  };

  const handleEdit = (permission: Permission) => {
    setEditingPermission(permission);
    setIsModalOpen(true);
  };

  const handleDelete = async (permissionId: number) => {
    if (confirm('Are you sure you want to delete this permission?')) {
      try {
        await axios.delete(`http://localhost:5001/permissions/${permissionId}`);
        fetchPermissions();
      } catch (error) {
        console.error('Error deleting permission:', error);
      }
    }
  };

  const handleSubmit = async (data: { name: string }) => {
    try {
      if (editingPermission) {
        // Update permission
        await axios.put(`http://localhost:5001/permissions/${editingPermission.id}`, { ...editingPermission, ...data });
      } else {
        // Create new permission
        await axios.post('http://localhost:5001/permissions', data);
      }
      setIsModalOpen(false);
      fetchPermissions();
    } catch (error) {
      console.error('Error saving permission:', error);
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Permissions</h1>
        <Button onClick={handleAdd}>Add Permission</Button>
      </div>
      <PermissionTable permissions={permissions} onEdit={handleEdit} onDelete={handleDelete} />
      <PermissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={
          editingPermission
            ? {
                name: editingPermission.name,
              }
            : undefined
        }
      />
    </Layout>
  );
};

export default PermissionsPage;

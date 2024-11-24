// pages/roles/index.tsx
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import RoleTable from '../../components/Roles/RoleTable';
import RoleModal from '../../components/Roles/RoleModal';
import Button from '../../components/common/Button';
import axios from 'axios';

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: number[];
}

interface Permission {
  id: number;
  name: string;
}

const RolesPage = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await axios.get<Role[]>('http://localhost:5001/roles');
      setRoles(res.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const fetchPermissions = async () => {
    try {
      const res = await axios.get<Permission[]>('http://localhost:5001/permissions');
      setPermissions(res.data);
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  };

  const handleAdd = () => {
    setEditingRole(null);
    setIsModalOpen(true);
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role);
    setIsModalOpen(true);
  };

  const handleDelete = async (roleId: number) => {
    if (confirm('Are you sure you want to delete this role?')) {
      try {
        await axios.delete(`http://localhost:5001/roles/${roleId}`);
        fetchRoles();
      } catch (error) {
        console.error('Error deleting role:', error);
      }
    }
  };

  const handleSubmit = async (data: { name: string; description: string; permissions: number[] }) => {
    try {
      if (editingRole) {
        // Update role
        await axios.put(`http://localhost:5001/roles/${editingRole.id}`, { ...editingRole, ...data });
      } else {
        // Create new role
        await axios.post('http://localhost:5001/roles', data);
      }
      setIsModalOpen(false);
      fetchRoles();
    } catch (error) {
      console.error('Error saving role:', error);
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Roles</h1>
        <Button onClick={handleAdd}>Add Role</Button>
      </div>
      <RoleTable roles={roles} permissions={permissions} onEdit={handleEdit} onDelete={handleDelete} />
      <RoleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={
          editingRole
            ? {
                name: editingRole.name,
                description: editingRole.description,
                permissions: editingRole.permissions,
              }
            : undefined
        }
        permissions={permissions}
      />
    </Layout>
  );
};

export default RolesPage;

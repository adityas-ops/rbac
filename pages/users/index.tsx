// pages/users/index.tsx
import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import UserTable from '../../components/Users/UserTable';
import UserModal from '../../components/Users/UserModal';
import Button from '../../components/common/Button';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  roleId: number;
  status: string;
}

interface Role {
  id: number;
  name: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get<User[]>('http://localhost:5001/users');
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await axios.get<Role[]>('http://localhost:5001/roles');
      setRoles(res.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (userId: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5001/users/${userId}`);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleSubmit = async (data: { name: string; email: string; roleId: number; status: string }) => {
    try {
      if (editingUser) {
        // Update user
        await axios.put(`http://localhost:5001/users/${editingUser.id}`, { ...editingUser, ...data });
      } else {
        // Create new user
        await axios.post('http://localhost:5001/users', data);
      }
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <Button onClick={handleAdd}>Add User</Button>
      </div>
      <UserTable users={users} roles={roles} onEdit={handleEdit} onDelete={handleDelete} />
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={
          editingUser
            ? {
                name: editingUser.name,
                email: editingUser.email,
                roleId: editingUser.roleId,
                status: editingUser.status,
              }
            : undefined
        }
        roles={roles}
      />
    </Layout>
  );
};

export default UsersPage;

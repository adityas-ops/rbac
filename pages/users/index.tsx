import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import UserTable from '../../components/Users/UserTable';
import UserModal from '../../components/Users/UserModal';
import Button from '../../components/common/Button';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
  status: string;
}

interface Role {
  id: string;
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

  const handleDelete = async (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5001/users/${userId}`);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleSubmit = async (data: { name: string; email: string; roleId: string; status: string }) => {
    try {
      // Validate roleId
      const roleExists = roles.find((role) => role.id === data.roleId);
      if (!roleExists) {
        alert('Invalid role selected!');
        return;
      }

      if (editingUser) {
        // Update user
        await axios.put(`http://localhost:5001/users/${editingUser.id}`, { ...editingUser, ...data });
      } else {
        // Create new user
        await axios.post('http://localhost:5001/users', data);
      }
      setIsModalOpen(false);
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <Layout>
      <div className="w-full h-full   ">
        <div className="flex w-full px-[20px] sm:px-0 sm:pt-0 flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h1 className="sm:text-2xl text-xl font-bold text-center py-[10px] sm:py-0">Users</h1>
          <Button onClick={handleAdd}>Add User</Button>
        </div>
        <div className=" overflow-hidden w-full ">

          <UserTable users={users} roles={roles} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
        {isModalOpen && (
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
        )}
      </div>
    </Layout>
  );
  
};

export default UsersPage;

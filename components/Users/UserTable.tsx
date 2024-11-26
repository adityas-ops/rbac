import React from 'react';
import Table from '../common/Table';
import { FaEdit, FaTrash } from 'react-icons/fa';

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

interface UserTableProps {
  users: User[];
  roles: Role[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, roles, onEdit, onDelete }) => {
  const getRoleName = (roleId: string) => roles.find((role) => role.id === roleId)?.name || 'N/A';

  return (
    <Table headers={['Name', 'Email', 'Role', 'Status', 'Actions']}>
      {users.map((user) => (
        <tr key={user.id} className="border-t">
          <td className="py-4 px-6">{user.name}</td>
          <td className="py-4 px-6">{user.email}</td>
          <td className="py-4 px-6">{getRoleName(user.roleId)}</td>
          <td className="py-4 px-6">{user.status}</td>
          <td className="py-4 px-6 flex space-x-2">
            <button onClick={() => onEdit(user)} className="text-yellow-500 hover:text-yellow-700">
              <FaEdit />
            </button>
            <button onClick={() => onDelete(user.id)} className="text-red-500 hover:text-red-700">
              <FaTrash />
            </button>
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default UserTable;

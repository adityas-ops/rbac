// components/Roles/RoleTable.tsx
import React from 'react';
import Table from '../common/Table';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Role {
  id: number;
  name: string;
  description: string;
  permissions: number[];
}

interface RoleTableProps {
  roles: Role[];
  permissions: { id: number; name: string }[];
  onEdit: (role: Role) => void;
  onDelete: (roleId: number) => void;
}

const RoleTable: React.FC<RoleTableProps> = ({ roles, permissions, onEdit, onDelete }) => {
  const getPermissionNames = (permIds: number[]) =>
    permIds.map((id) => permissions.find((perm) => perm.id === id)?.name).join(', ');

  return (
    <Table headers={['Name', 'Description', 'Permissions', 'Actions']}>
      {roles.map((role) => (
        <tr key={role.id} className="border-t">
          <td className="py-4 px-6">{role.name}</td>
          <td className="py-4 px-6">{role.description}</td>
          <td className="py-4 px-6">{getPermissionNames(role.permissions)}</td>
          <td className="py-4 px-6 flex space-x-2">
            <button onClick={() => onEdit(role)} className="text-yellow-500 hover:text-yellow-700">
              <FaEdit />
            </button>
            <button onClick={() => onDelete(role.id)} className="text-red-500 hover:text-red-700">
              <FaTrash />
            </button>
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default RoleTable;

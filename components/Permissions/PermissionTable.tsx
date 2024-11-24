// components/Permissions/PermissionTable.tsx
import React from 'react';
import Table from '../common/Table';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Permission {
  id: number;
  name: string;
}

interface PermissionTableProps {
  permissions: Permission[];
  onEdit: (permission: Permission) => void;
  onDelete: (permissionId: number) => void;
}

const PermissionTable: React.FC<PermissionTableProps> = ({ permissions, onEdit, onDelete }) => {
  return (
    <Table headers={['Name', 'Actions']}>
      {permissions.map((perm) => (
        <tr key={perm.id} className="border-t">
          <td className="py-4 px-6">{perm.name}</td>
          <td className="py-4 px-6 flex space-x-2">
            <button onClick={() => onEdit(perm)} className="text-yellow-500 hover:text-yellow-700">
              <FaEdit />
            </button>
            <button onClick={() => onDelete(perm.id)} className="text-red-500 hover:text-red-700">
              <FaTrash />
            </button>
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default PermissionTable;

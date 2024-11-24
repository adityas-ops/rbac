// components/Users/UserModal.tsx
import React from 'react';
import Modal from '../common/Modal';
import UserForm from './UserForm';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; roleId: number; status: string }) => void;
  initialData?: {
    name: string;
    email: string;
    roleId: number;
    status: string;
  };
  roles: { id: number; name: string }[];
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSubmit, initialData, roles }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit User' : 'Add User'}>
      <UserForm initialData={initialData} roles={roles} onSubmit={onSubmit} />
    </Modal>
  );
};

export default UserModal;

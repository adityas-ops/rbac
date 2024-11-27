// components/Users/UserModal.tsx
import React from 'react';
import Modal from '../common/Modal';
import UserForm from './UserForm';


interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; roleId: string; status: string }) => void;
  initialData?: {
    name: string;
    email: string;
    roleId: string;
    status: string;
  };
  roles: { id: string; name: string }[];
  users: { email: string }[];
  

}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSubmit, initialData, roles,users }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit User' : 'Add User'}>
      <UserForm initialData={initialData} roles={roles} onSubmit={onSubmit}   users={users || []} />
    </Modal>
  );
};

export default UserModal;

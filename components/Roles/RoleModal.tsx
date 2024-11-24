// components/Roles/RoleModal.tsx
import React from 'react';
import Modal from '../common/Modal';
import RoleForm from './RoleForm';

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description: string; permissions: number[] }) => void;
  initialData?: {
    name: string;
    description: string;
    permissions: number[];
  };
  permissions: { id: number; name: string }[];
}

const RoleModal: React.FC<RoleModalProps> = ({ isOpen, onClose, onSubmit, initialData, permissions }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Role' : 'Add Role'}>
      <RoleForm initialData={initialData} permissions={permissions} onSubmit={onSubmit} />
    </Modal>
  );
};

export default RoleModal;

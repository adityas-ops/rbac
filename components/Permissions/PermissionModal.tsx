// components/Permissions/PermissionModal.tsx
import React from 'react';
import Modal from '../common/Modal';
import PermissionForm from './PermissionForm';

interface PermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string }) => void;
  initialData?: {
    name: string;
  };
}

const PermissionModal: React.FC<PermissionModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Permission' : 'Add Permission'}>
      <PermissionForm initialData={initialData} onSubmit={onSubmit} />
    </Modal>
  );
};

export default PermissionModal;

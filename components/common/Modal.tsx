// components/common/Modal.tsx
import React from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-[80%] sm:w-1/2 p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 ">
        <IoCloseCircleOutline className='text-[34px] text-gray-500 hover:text-gray-800 ' />
        </button>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;

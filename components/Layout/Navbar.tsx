// components/Layout/Navbar.tsx
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center">
      <div className="text-white font-bold text-xl">RBAC System</div>
      <div className="text-white">Admin Name</div>
    </nav>
  );
};

export default Navbar;

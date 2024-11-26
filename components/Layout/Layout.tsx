// components/Layout/Layout.tsx
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 bg-gray-100 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default Layout;

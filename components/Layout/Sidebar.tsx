// components/Layout/Sidebar.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaUsers, FaUserShield, FaLock, FaHome, FaBars, FaTimes } from 'react-icons/fa';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  const menu = [
    { name: 'Dashboard', icon: <FaHome />, path: '/' },
    { name: 'Users', icon: <FaUsers />, path: '/users' },
    { name: 'Roles', icon: <FaUserShield />, path: '/roles' },
    { name: 'Permissions', icon: <FaLock />, path: '/permissions' },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative">
      {/* Hamburger Icon */}
      {
        !isSidebarOpen  && (
          <button
          className="lg:hidden fixed top-[22px] left-4 z-50 text-black"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <FaBars size={24} />
        </button>
        )
      }
     

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-inner text-black transform transition-transform duration-300 z-40 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:block w-3/4 lg:w-64`}
      >
        {/* Close Button for Mobile */}
        <button
          className="lg:hidden absolute top-4 right-4 text-black"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        >
          <FaTimes size={24} />
        </button>
        <div className="pt-[18px] pb-[20px] text-black text-2xl text-center font-bold">RBAC</div>
        <ul>
          {menu.map((item) => (
            <li
              key={item.name}
              className={`hover:bg-[#2463EB] border-b border-black hover:text-white ${
                router.pathname === item.path ? 'bg-[#2463EB] text-white' : ''
              }`}
            >
              <Link href={item.path} onClick={toggleSidebar}>
                <p className="flex items-center p-4">
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;

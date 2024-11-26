// components/Layout/Sidebar.tsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaUsers, FaUserShield, FaLock, FaHome } from 'react-icons/fa';

const Sidebar = () => {
  const router = useRouter();
  const menu = [
    { name: 'Dashboard', icon: <FaHome />, path: '/' },
    { name: 'Users', icon: <FaUsers />, path: '/users' },
    { name: 'Roles', icon: <FaUserShield />, path: '/roles' },
    { name: 'Permissions', icon: <FaLock />, path: '/permissions' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-4 text-2xl text-center font-bold">RBAC</div>
      <ul>
        {menu.map((item) => (
          <li key={item.name} className={`hover:bg-gray-700 ${router.pathname === item.path ? 'bg-gray-700' : ''}`}>
            <Link href={item.path}>
              <p className="flex items-center p-4">
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;

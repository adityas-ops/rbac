import React, { useEffect, useState } from 'react';
import router from 'next/router';

const Navbar = () => {
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    // Ensure this runs only on the client
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setInterval(() => {
     router.push('/login');
    }
    , 500);
  }

  return (
    <nav className=" fixed top-0 left-0 right-0  bg-white shadow-2xl border-b p-4 flex justify-between items-center">
      <div className="text-black pl-[50px] font-[700] text-[1.25rem] ">
        {user ? `Welcome, ${user.name}!` : 'Welcome, Guest!'}
      </div>
      <button
        onClick={logout}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;

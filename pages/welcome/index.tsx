
import { useRouter } from "next/router";
import React, { useEffect, useState } from 'react'

function Index() {
  interface User {
    name: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
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

  console.log('User-- on welcone page', user);
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  }
  return (
    <div className=' w-full h-screen'>
       <div className=' w-full h-full flex flex-col gap-10 items-center justify-center '>
          <p className='  '>
            {user ? `Welcome, ${user.name}!` : 'Welcome, Guest!'}
          </p>
          <p>
            Please wait while admin approves your account.
          </p>
          <button
            onClick={handleLogout}
            className='bg-blue-500 text-white px-4 py-2 rounded-md ml-4'
          >
            Logout
          </button>
       </div>
    </div>
  )
}

export default Index
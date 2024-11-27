import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const checkAuth = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const user = localStorage.getItem("user");

    if (!isAuthenticated || !user) {
      router.replace("/login");
    } else {
      setIsAuthorized(true);
    }
  };

  useEffect(() => {
    checkAuth();

    // Listen for localStorage changes (e.g., login/logout events)
    window.addEventListener("storage", checkAuth);

    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  if (!isAuthorized) {
    return null; // Prevent rendering until authentication is verified
  }

  return <>{children}</>;
};

export default ProtectedRoute;

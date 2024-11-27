// pages/login.tsx
import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { useRouter } from "next/router";
import axios from "axios";

const LoginPage = () => {
  const router = useRouter();
  // const [user, setUser] = useState<unknown>(null);




  useEffect(() => {
    // Clear any existing user data when landing on the login page
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  }, []);

  const handleLogin = async (username: string, password: string) => {
    if (username === "admin" && password === "1234") {
      const adminUser = {
        id: "9404",
        name: "admin",
        email: "admin@example.com",
        roleId: "1",
        status: "Active",
      };

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(adminUser));

      // Navigate to home page
      router.replace("/"); // Replace instead of push to prevent login page in history
      return;
    }

    try {
      const res = await axios.get("http://localhost:5001/Login");
      const loginData = res.data;

      const matchedUser = loginData.find(
        (user: { username: string; password: string }) =>
          user.username === username && user.password === password
      );

      if (matchedUser) {
        const userRes = await axios.get("http://localhost:5001/users");
        const users = userRes.data;

        const foundUser = users.find(
          (u: { username: string }) => u.username === username
        );

        if (foundUser) {
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("user", JSON.stringify(foundUser));

          // Redirect based on role
          const targetRoute = foundUser.roleId === "1" ? "/" : "/welcome";
          router.replace(targetRoute);
        }
        else{
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("user", JSON.stringify(matchedUser));
          router.replace("/welcome")
        }
      } else {
        alert("Invalid username or password!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };
  
  

  return (
    <div className=" h-screen overflow-hidden relative loginPage flex items-center justify-center">
      <div className=" px-[30px]  sm:px-[300px]  h-[480px] sm:h-[600px] flex items-center justify-center loginPage  rounded-md">
        <LoginForm onLogin={handleLogin} />
      </div>
      <div>
        <img
          src="/images/1.svg"
          alt="login"
          className="absolute -rotate-45 left-[25%] top-[15%] sm:top-[7%] w-[100px] h-[100px] sm:w-[160px] sm:h-[160px]"
        />
      </div>

      <div>
        <img
          src="/images/5.svg"
          alt="login"
          className="absolute text-blue-500   left-8 bottom-8 w-[70px] h-[70px] sm:w-[160px] sm:h-[160px]"
        />
      </div>
      <div>
        <img
          src="/images/1.svg"
          alt="login"
          className="absolute rotate-90  right-[25%] bottom-[15%] sm:bottom-[-3%] w-[100px] h-[100px] sm:w-[360px] sm:h-[360px]"
        />
      </div>
    </div>
  );
};

export default LoginPage;

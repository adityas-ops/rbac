// pages/login.tsx
import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import { useRouter } from "next/router";
import axios from "axios";

const LoginPage = () => {
  const router = useRouter();
  const [user, setUser] = useState<unknown>(null);

  const handleLogin = async (username: string, password: string) => {
    // Mock authentication logic for admin
    if (username === "admin" && password === "password") {
      localStorage.setItem("isAuthenticated", "true");
      router.push("/");
    } else {
      try {
        const res = await axios.get("http://localhost:5001/Login");
        const data = res.data;

        // Check if username and password match any record in the array and find role of the user
        const user = data.find(
          (user: { username: string; password: string }) =>
            user.username === username && user.password === password
        );

        if (user) {
          // console.log('Login is happening');
          const res = await axios.get("http://localhost:5001/users");
          const users = res.data;
          //  find the user in the users array and set the user in the state
          const finding = users.find(
            (u: { username: string }) => u.username === username
          );
          if (finding) {
            setUser(finding);
            localStorage.setItem("isAuthenticated", "true");
            localStorage.setItem("user", JSON.stringify(finding));
            if (finding.roleId === "1") {
              router.push("/");
            } else {
              localStorage.setItem("user", JSON.stringify(finding));
              localStorage.setItem("isAuthenticated", "true");
              router.push("/welcome");
            }
          }
          localStorage.setItem("isAuthenticated", "true");
           localStorage.setItem("user", JSON.stringify(user));
          router.push("/welcome");
        } else {
          router.push("/signin");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again.");
      }
    }
  };

  console.log("User--", user);

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

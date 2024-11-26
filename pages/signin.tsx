import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SingupForm from "@/components/SignupForm";

function Signin() {
  const router = useRouter();

  const handleLogin = async (username: string, password: string,name:string,email:string) => {
    // Mock authentication logic for admin
    try {
      const res = await axios.post("http://localhost:5001/Login", {
        username: username,
        name: name,
        password: password,
        email:email
      });
      const data = res.data;
      console.log(data);
      if (data) {
        router.push("login");
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className=" h-screen overflow-hidden relative loginPage   flex items-center justify-center">
      <button 
      className=" absolute left-[30px]  top-[30px] w-[100px] rounded-md h-[40px] bg-white text-black"
      onClick={() => router.push("/login")}
      >
       back
      </button>
      <div className=" w-[90%] sm:w-[80%]  h-[580px] sm:h-[600px] flex items-center justify-center loginPage  rounded-md">
        <SingupForm onLogin={handleLogin} />
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
}

export default Signin;

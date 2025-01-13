"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "../../../../api/axiosinstance/axiosInstance";

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState<string|null>(null);

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLog = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setStatus("loading");
      setError(null);

      const values = { email, password };
      console.log("Login values:", values);

      const response = await axiosInstance.post("/Auth/login", values);

      console.log("Login response:", response.data);
      setStatus("succeeded");

      
      router.push("/");
    } catch (error) {
      setError("Login failed");
      console.error("Login error:", error);
      setStatus("failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 relative">
        <h1 className="text-white font-serif text-3xl pl-6 pt-4 z-10 relative">
          Belvoir.
        </h1>
        <div className="absolute left-0 top-0 h-screen w-1/2 overflow-hidden">
          <Image
            src="/login/bg.jpg"
            alt="Elegant jacket display"
            className="object-cover object-center w-full h-full transform scale-110"
            width={400}
            height={400}
          />
          <div className="absolute inset-0 bg-black opacity-20"></div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="w-96 p-8">
          <div className="text-center mb-12">
            <h1 className="font-serif text-3xl mb-1">Belvoir.</h1>
            <p className="text-gray-600 text-sm">Welcome Back!</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-5">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white border-b border-gray-200 focus:border-gray-800 transition-colors outline-none"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-b border-gray-200 focus:border-gray-800 transition-colors outline-none"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="text-right">
              <a href="#" className="text-xs text-gray-500 hover:text-gray-800">
                Forgot password?
              </a>
            </div>

            <button
              onClick={handleLog}
              disabled={status === "loading"}
              className="w-full bg-gray-900 text-white py-3 rounded-sm hover:bg-gray-800 transition-colors text-sm flex justify-center"
            >
              {status === "loading" ? (
                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              ) : (
                "Login"
              )}
            </button>

            <div className="text-center text-xs text-gray-500">
              Don&apos;t have an account? 
              <Link href="/register" className="text-gray-800">
                SignUp
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

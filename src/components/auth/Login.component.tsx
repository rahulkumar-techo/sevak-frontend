"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/validation/auth";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

type Props = {
  handleLogin:(value:{email:string,password:string})=>void;
  isLogging:boolean;
}
export default function LoginComp({handleLogin,isLogging}:Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });




  const onSubmit = (data: LoginInput) => {
    handleLogin(data)
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl p-8 sm:p-10 rounded-2xl shadow-xl bg-white dark:bg-gray-800 transition-all">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center text-gray-800 dark:text-gray-100">
          Welcome Back
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={`w-full p-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 transition ${errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
                }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className={`w-full p-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 transition ${errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
                }`}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

            <Link
              href="/auth/forgot-password"
              className="self-end text-sm underline hover:text-green-600 dark:hover:text-green-400 mt-1"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLogging}
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition transform hover:scale-105 disabled:opacity-50"
          >
            {isLogging ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-2">
          <hr className="flex-1 border-gray-300 dark:border-gray-600" />
          <span className="text-gray-500 dark:text-gray-400 text-sm">or continue with</span>
          <hr className="flex-1 border-gray-300 dark:border-gray-600" />
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition font-medium transform hover:scale-105"
        >
          <FcGoogle size={24} />
          Continue with Google
        </button>

        {/* Footer Links */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between text-sm text-gray-600 dark:text-gray-300 gap-2 sm:gap-0">
          <div /> {/* Empty placeholder for alignment */}
          <Link
            href="/auth/register"
            className="underline hover:text-green-600 dark:hover:text-green-400 text-center sm:text-right"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

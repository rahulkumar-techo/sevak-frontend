"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupInput } from "@/validation/auth";
import Link from "next/link";

type TRegister = {
  handleRegister: (value: { email: string, password: string, fullName: string, confirmPassword: string }) => void;
  isRegistering: boolean
}

export default function RegisterComp({ handleRegister, isRegistering }: TRegister) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "" },
  });



  const onSubmit = async (data: SignupInput) => {
    const { fullName, confirmPassword, password, email } = data;
    handleRegister({ fullName, confirmPassword, password, email })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl p-8 sm:p-10 rounded-2xl shadow-xl bg-white dark:bg-gray-800 transition-all">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center text-gray-800 dark:text-gray-100">
          Create Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* FullName */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("fullName")}
              className={`w-full p-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 transition ${errors.fullName
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
                }`}
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
          </div>


          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={`w-full p-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 transition ${errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
                }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className={`w-full p-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 transition ${errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
                }`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
              className={`w-full p-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 transition ${errors.confirmPassword
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300"
                }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isRegistering}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition transform hover:scale-105 disabled:opacity-50"
          >
            {isRegistering ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="underline text-blue-600 dark:text-blue-400 hover:text-blue-700"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

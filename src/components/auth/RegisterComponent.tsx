"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupInput } from "@/validation/auth";
import CustomModal from "@/utils/CustomModal";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import LoginComp from "./Login.component";
type Props = {
  isOpen: boolean;
  onClose: () => void;
  openLogin?: () => void;
};
const Register = ({ isOpen, onClose,openLogin }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });
  //   const [isOpen,setIsOpen] = useState<boolean>(false)

  const [registerUser, { data, error, isLoading, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (error) {
      const registerError =
        ((error as any)?.data?.message) || "Something went wrong";

      console.error("Register error:", registerError);
      // optionally show a toast or alert
      toast.error(registerError);
    }
  }, [error]);




  const onSubmit = async (data: SignupInput) => {
    try {
      const result = await registerUser({
        fullName: data.name,
        email: data.email,
        password: data.password,
      }).unwrap();

      onClose();
      toast.success("Registration successful! Please verify your email.");
    } catch (err) {

      console.error("Registration error:", err);

    }
  };




  return (
    <CustomModal isOpen={isOpen} onClose={onClose} title="Sign Up" isDirty={isDirty}>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div>
          <input
            type="text"
            placeholder="Full Name"
            {...register("name")}
            className={`w-full p-2 border rounded-lg bg-transparent focus:outline-none focus:ring-2 ${errors.name
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
              }`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className={`w-full p-2 border rounded-lg bg-transparent focus:outline-none focus:ring-2 ${errors.email
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
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
            className={`w-full p-2 border rounded-lg bg-transparent focus:outline-none focus:ring-2 ${errors.password
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
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
            className={`w-full p-2 border rounded-lg bg-transparent focus:outline-none focus:ring-2 ${errors.confirmPassword
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
              }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
        Already have an account?{" "}
        <button
          onClick={openLogin}
          className="underline text-blue-600 dark:text-blue-400 hover:text-blue-700"
        >
          Login
        </button>
      </div>
    </CustomModal>
  );
};

export default Register;

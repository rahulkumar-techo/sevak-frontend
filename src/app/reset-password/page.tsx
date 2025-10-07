"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Zod schema for new password
const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
    otp:z.string().min(6,"least 6 digits")
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // get token from URL
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  

  const onSubmit = async (data: ResetPasswordInput) => {
    // if (!token) {
    //   alert("Invalid or missing token");
    //   return;
    // }

    try {
      // TODO: call backend API to reset password
      // Example:
      // await fetch("/api/auth/reset-password", {
      //   method: "POST",
      //   body: JSON.stringify({ token, password: data.password }),
      //   headers: { "Content-Type": "application/json" },
      // });

      console.log("Reset password:", data.password, "Token:", token);

      setSubmitted(true);

      // Optional: redirect to login after 2s
      setTimeout(() => router.push("/"), 2000);
    } catch (error) {
      console.error(error);
      alert("Failed to reset password");
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-md text-center">
          <h2 className="text-xl font-semibold mb-2 text-green-600">
            Password Reset Successful!
          </h2>
          <p>You will be redirected to login shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-md rounded-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
          Reset Password
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              OTP
            </label>
            <input
              type="text"
              placeholder="Enter OTP"
              {...register("otp")}
              className={`w-full p-2 border rounded-lg bg-transparent focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              {...register("password")}
              className={`w-full p-2 border rounded-lg bg-transparent focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:ring-blue-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              {...register("confirmPassword")}
              className={`w-full p-2 border rounded-lg bg-transparent focus:outline-none focus:ring-2 ${
                errors.confirmPassword
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
            disabled={isSubmitting}
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

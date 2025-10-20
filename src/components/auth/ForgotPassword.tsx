"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";

// Zod schema for email validation
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

interface IForgotPasswordPage {
  handleForgotPassword: ({ email }: { email: string }) => void;
  isSubmittingLink?: boolean;
  
}

export default function ForgotPasswordPage({ handleForgotPassword, isSubmittingLink }: IForgotPasswordPage) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    handleForgotPassword({ email: data?.email })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl p-8 sm:p-10 rounded-2xl shadow-xl bg-white dark:bg-gray-800 transition-all">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-center text-gray-800 dark:text-gray-100">
          Forgot Password
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className={`w-full p-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 transition ${errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmittingLink}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition transform hover:scale-105 disabled:opacity-50"
          >
            {isSubmittingLink ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Remembered your password?{" "}
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

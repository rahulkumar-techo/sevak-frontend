"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/validation/auth";
import CustomModal from "@/utils/CustomModal";
import { FcGoogle } from "react-icons/fc";
import Register from "./RegisterComponent";
import ForgotPassword from "./ForgotPassword";
import { useUserLoginApiMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

export default function LoginComp() {
  const [open, setOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const [loginUser, { isLoading, error, isSuccess }] = useUserLoginApiMutation();
  useEffect(() => {
    if (error) {
      const registerError =
        ((error as any)?.data?.message) || "Something went wrong";
      toast.error(registerError);
    }
    if (isSuccess) {
      setOpen(false);
    }
  }, [error, isSuccess]);



  const onSubmit = (data: LoginInput) => {
    loginUser({ email: data?.email, password: data.password });
  };

  const handleGoogleLogin = async () => {
    window.location.href = "http://localhost:5000/auth/google";

  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Login
      </button>

      {/* Login Modal */}
      <CustomModal isOpen={open} onClose={() => setOpen(false)} title="Login" isDirty={isDirty}>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={`w-full p-2 border rounded-lg bg-transparent focus:outline-none focus:ring-2 ${errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-700 focus:ring-green-500"
                }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className={`w-full p-2 border rounded-lg bg-transparent focus:outline-none focus:ring-2 ${errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-700 focus:ring-green-500"
                }`}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-2">
          <hr className="flex-1 border-gray-300 dark:border-gray-700" />
          <span className="text-gray-500 dark:text-gray-400 text-sm">or</span>
          <hr className="flex-1 border-gray-300 dark:border-gray-700" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        {/* Footer links */}
        <div className="mt-4 flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <button
            onClick={() => {
              setOpen(false);
              setForgotPasswordOpen(true);
            }}
            className="underline hover:text-green-600 dark:hover:text-green-400"
          >
            Forgot Password?
          </button>

          <button
            onClick={() => {
              setOpen(false);
              setSignupOpen(true);
            }}
            className="underline hover:text-green-600 dark:hover:text-green-400"
          >
            Create Account
          </button>
        </div>
      </CustomModal>

      {/* Signup & Forgot Password Modals */}
      <Register isOpen={signupOpen} onClose={() => setSignupOpen(false)}
        openLogin={() => {
          setSignupOpen(false);
          setOpen(true);
        }}
      />
      <ForgotPassword isOpen={forgotPasswordOpen} onClose={() => setForgotPasswordOpen(false)} />
    </>
  );
}

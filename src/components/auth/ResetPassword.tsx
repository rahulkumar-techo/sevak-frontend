"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

type Props = {
  handleResetPassword: (value: { otp: string, newPassword: string }) => void;
  isResetPasswordLoading?:boolean
};

export default function ResetPassword({ handleResetPassword ,isResetPasswordLoading}: Props) {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // only digits
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // only last digit
    setOtp(newOtp);

    // auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some((d) => !d)) {
      toast.error("Please enter all 6 digits");
      return;
    }
    if (!newPassword) {
      toast.error("Please enter new password");
      return;
    }

    const otpCode = otp.join("");
    handleResetPassword({ otp: otpCode, newPassword })
    toast.success("OTP confirmed and password set!");
    // TODO: Call API for OTP confirmation and password reset
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md p-8 sm:p-10 rounded-2xl shadow-xl bg-white dark:bg-gray-800 transition-all">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Reset Password
        </h2>

        {/* OTP Inputs */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-between gap-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                type="text"
                maxLength={1}
                className="text-center text-xl border-blue-500 focus:ring-blue-500 focus:border-blue-500"
              />
            ))}
          </div>

          {/* New Password */}
          <div>
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border-blue-500 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            Confirm OTP & Set Password
          </Button>
        </form>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          OTP is valid for 15 minutes
        </span>
      </div>
    </div>
  );
}

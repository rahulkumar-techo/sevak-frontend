"use client"
import React, { useEffect } from 'react'
import { useReset_passwordMutation } from '@/redux/features/auth/authApi'
import { useParams, useRouter } from 'next/navigation'
import ResetPassword from '@/components/auth/ResetPassword'
import toast from 'react-hot-toast'

const ResetPasswordPage = () => {
  const router = useRouter()
  let { token } = useParams() // token can be string | string[] | undefined

  const [resetPasswordMutation, { data, isLoading, error, isSuccess }] = useReset_passwordMutation()

  // Handle backend success and error messages
  useEffect(() => {
    if (error) {
      const message = (error as any)?.data?.message || "Something went wrong"
      toast.error(message)
    }

    if (isSuccess && data) {
      toast.success((data as any)?.message || "Password reset successful")
      router.push("/auth/login") // redirect to login after success
    }
  }, [error, isSuccess, data, router])

  // Called by child component on form submit
  const handleResetPassword = async (values: { otp: string; newPassword: string }) => {
    if (!token) {
      toast.error("Reset token missing")
      return
    }

    // Ensure token is a string
    const resetToken = Array.isArray(token) ? token[0] : token

    try {
      await resetPasswordMutation({
        otp: values.otp,
        password: values.newPassword,
        resetToken
      }).unwrap()
    } catch (err) {
      console.error(err) // error handled in useEffect
    }
  }

  return (
    <div>
      <ResetPassword
        handleResetPassword={handleResetPassword}
        isResetPasswordLoading={isLoading}
      />
    </div>
  )
}

export default ResetPasswordPage

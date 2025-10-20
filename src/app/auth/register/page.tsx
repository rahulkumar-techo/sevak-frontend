"use client"
import RegisterComp from '@/components/auth/RegisterComponent'
import { useRegisterMutation } from '@/redux/features/auth/authApi';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';

type Props = {}

const page = (props: Props) => {

  const router = useRouter()
  const [registerUser, { isLoading: isRegistering, error, isSuccess }] = useRegisterMutation();
  useEffect(() => {
    if (error) {
      const registerError = ((error as any)?.data?.message) || "Something went wrong";
      toast.error(registerError);
    }
    if (isSuccess) {
      // router.push("/auth/forgot-password")
      toast.success("Check your email and verify")
    }
  }, [error, isSuccess]);
  const handleRegister = (value: { email: string, password: string, fullName: string, confirmPassword: string }) => {
    if (!value?.email || !value?.password || !value?.fullName) {
      toast.error("Fill email and password")
    }
    registerUser({ fullName: value?.fullName, email: value?.email, password: value?.password });

  }
  return (
    <div>
      <RegisterComp handleRegister={handleRegister} isRegistering={isRegistering} />
    </div>
  )
}

export default page
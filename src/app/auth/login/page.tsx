"use client"
import LoginComp from '@/components/auth/Login.component'
import { useUserLoginApiMutation } from '@/redux/features/auth/authApi'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

type Props = {}

const page = (props: Props) => {
  const [loginUser, { isLoading: isLogging, error ,isSuccess}] = useUserLoginApiMutation();
  const router = useRouter()
  useEffect(() => {
    if (error) {
      const registerError = ((error as any)?.data?.message) || "Something went wrong";
      toast.error(registerError);
    }
    if(isSuccess){
      router.push("/")
    }
  }, [error,isSuccess]);
  const handleLogin = (value: { email: string, password: string }) => {
    if (!value?.email || !value?.password) {
      toast.error("Fill email and password")
    }
    loginUser({ email: value?.email, password: value?.password })
  }
  return (
    <div>
      <LoginComp handleLogin={handleLogin} isLogging={isLogging} />
    </div>
  )
}

export default page
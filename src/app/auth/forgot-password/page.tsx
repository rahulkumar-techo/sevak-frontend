"use client"
import ForgotPasswordPage from '@/components/auth/ForgotPassword'
import { useForgot_passwordMutation } from '@/redux/features/auth/authApi'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

const page = () => {
    const router = useRouter();
    const [forgot_password, { data, isLoading, error, isSuccess }] = useForgot_passwordMutation()

    useEffect(() => {
        if (error) {
            const registerError = (error as any)?.data?.message || "Something went wrong";
            toast.error(registerError);
        }

        if (isSuccess && data) {
            toast.success((data as any)?.message || "Check your email and verify");
        }
    }, [error, isSuccess, data]);

    const handleActions = async (value: { email: string }) => {
        try {
            await forgot_password(value).unwrap();
            router.push("/auth/reset-password");
        } catch (err) {
            // already handled by useEffect
        }
    }

    return (
        <div>
            <ForgotPasswordPage handleForgotPassword={handleActions}
            isSubmittingLink={isLoading}
            />

        </div>
    )
}

export default page

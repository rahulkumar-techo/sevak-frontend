"use client";
import { useRouter } from "next/navigation";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogOutMutation } from "@/redux/features/auth/authApi";


type ProfileProps = {
  avatar: string;
  fullName: string;
  email: string;
  id?: string;
  roles?: string[]
};

const ProfileDropdown = ({ avatar, fullName, email, id, roles }: Partial<ProfileProps>) => {

  const router = useRouter()
  const nameSlug = fullName?.toLowerCase().replace(/\s+/g, "-");
  // useSelector(user?.avatar?.url)
  const [logoutUser, { isLoading }] = useLogOutMutation()
  const handleLogOut = async () => {
    try {
      await logoutUser().unwrap(); // triggers logout
      router.push("/"); // redirect after logout
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  console.log(roles)
  const handleDashboard = () => {
    if (roles?.includes("admin")) {
      router.push("/dashboard/admin"); // redirect after logout

    }
    if (roles?.includes("user")) {
      router.push("/dashboard/user"); // redirect after logout

    }
    if (roles?.includes("provider")) {
      router.push("/dashboard/provider"); // redirect after logout
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 rounded-full">
          <Avatar className="">
            {avatar ? (
              <AvatarImage
                src={avatar}
                alt={fullName || "User"}
                className="w-full h-full object-cover"
              />

            ) : (
              <AvatarFallback>{(fullName || "User")[0]}</AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        {/* User Info */}
        <div className="flex flex-col items-start p-4 border-b border-gray-200 dark:border-gray-700">
          <span className="font-semibold dark:text-white ">{fullName || "User"}</span>
          <span className="text-sm text-gray-500 dark:text-gray-300 truncate block w-40">
            {email || "@mail"}
          </span>

        </div>

        {/* Dropdown Actions */}
        <DropdownMenuItem onClick={() => router.push(`/${nameSlug}/${id}`)}>
          View Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Settings")}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDashboard}>
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogOut}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;

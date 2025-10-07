"use client";

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

type ProfileProps = {
  avatar: string;
  fullname: string;
  email: string;
};

const ProfileDropdown = ({ avatar, fullname, email }: Partial<ProfileProps>) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-0 rounded-full">
          <Avatar className="">
            {avatar ? (
              <AvatarImage src={avatar} alt={fullname || "User"} />
            ) : (
              <AvatarFallback>{(fullname || "User")[0]}</AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        {/* User Info */}
        <div className="flex flex-col items-start p-4 border-b border-gray-200 dark:border-gray-700">
          <span className="font-semibold dark:text-white">{fullname || "User"}</span>
          <span className="text-sm text-gray-500 dark:text-gray-300">{email || "@mail"}</span>
        </div>

        {/* Dropdown Actions */}
        <DropdownMenuItem onClick={() => console.log("View Profile")}>
          View Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Settings")}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Logout")}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;

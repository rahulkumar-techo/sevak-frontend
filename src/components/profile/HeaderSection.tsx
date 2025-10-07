"use client";

import React, { useState, ChangeEvent, useRef } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaEdit } from "react-icons/fa";
import { MdOutlineVerifiedUser } from "react-icons/md";

type Props = {
  fullName: string;
  avatar: string;
  isActive?: boolean;
  isVerified?: boolean;
  role?: string;
  onSave?: (data: { fullName: string; avatar: File | string }) => void;
};

const HeaderSection = ({ fullName, avatar, onSave, role, isActive, isVerified }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState(fullName);
  const [selectedImage, setSelectedImage] = useState<string | File>(avatar);
  const [preview, setPreview] = useState<string>(avatar);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (fileInputRef.current && isEdit) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (onSave) onSave({ fullName: name, avatar: selectedImage });
    setIsEdit(false);
  };

  return (
    <Card className="w-full max-w-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 shadow-md rounded-xl">
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Profile Header
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEdit(!isEdit)}
          className="text-gray-700 dark:text-gray-200 border-gray-400 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          {isEdit ? "Cancel" : "Edit"}
        </Button>
      </CardHeader>

      <CardContent className="flex items-center gap-6 pt-2">
        {/* Avatar */}
        <div
          onClick={handleImageClick}
          className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-700 shadow-md cursor-pointer"
          title={isEdit ? "Click to change image" : ""}
        >
          <Image
            src={preview || "/placeholder.png"}
            alt="Profile Avatar"
            fill
            className="object-cover"
          />
          {isEdit && (
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-full">
              <FaEdit className="text-white text-lg" />
            </div>
          )}
        </div>

        {/* Hidden file input */}
        {isEdit && (
          <Input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        )}

        {/* Name and Save */}
        <div className="flex-1 flex flex-col gap-2">
          {isEdit ? (
            <>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 py-2 px-3 rounded-md"
              />
              <Button
                size="sm"
                className="mt-2 w-fit bg-green-600 hover:bg-green-700 text-white"
                onClick={handleSave}
              >
                Save
              </Button>
            </>
          ) : (
          
            <div className="flex flex-col gap-1">
  {/* Name */}
  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{name}</p>

  {/* Role and Active Status */}
  <div className="flex items-center gap-2 flex-wrap">
    {role && (
      <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 text-sm font-medium rounded-full">
        {role}
      </span>
    )}
    {isActive && (
      <span className="px-2 py-0.5 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 text-sm font-medium rounded-full flex items-center gap-1">
        <span className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"></span>
        Active
      </span>
    )}
  </div>

  {/* Verified Badge */}
  {isVerified && (
    <span className="mt-1 inline-flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-semibold">
      <MdOutlineVerifiedUser /> Verified
    </span>
  )}
</div>

          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HeaderSection;

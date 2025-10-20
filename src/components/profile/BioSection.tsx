"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  initialBio?: string;
  isLoading: boolean;
  onSave?: (bio: string) => void;
};

const BioSection = ({ initialBio = "", isLoading, onSave }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [bio, setBio] = useState(initialBio);

  useEffect(() => {
    setBio(initialBio || "");
  }, [initialBio]);

  useEffect(() => {
    if (!isLoading) setIsEdit(false);
  }, [isLoading]);

  const handleSave = () => onSave?.(bio);

  return (
    <Card className="w-full max-w-lg bg-gradient-to-r from-[#00ff99]/10 to-[#b3ff00]/10 border border-gray-300 dark:border-gray-700 shadow-lg rounded-2xl">
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">About Me</CardTitle>
        <Button
          size="sm"
          variant="outline"
          className="text-gray-700 dark:text-gray-200 border-gray-400 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800"
          onClick={() => setIsEdit(!isEdit)}
        >
          {isEdit ? "Cancel" : "Edit"}
        </Button>
      </CardHeader>
      <CardContent className="pt-2">
        {isEdit ? (
          <div className="flex flex-col gap-3">
            <textarea
              className="w-full p-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 rounded-md resize-none"
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write something about yourself..."
            />
            <Button
              size="sm"
              className="w-fit bg-[#00ff99] hover:bg-[#b3ff00] text-black font-semibold"
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">{bio || "No bio added yet."}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default BioSection;

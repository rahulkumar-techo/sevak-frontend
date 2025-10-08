"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  onSave?: (bio: string) => void;
  initialBio?: string;
  isLoading: boolean
};

const BioSection = ({ onSave, initialBio = "", isLoading }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [bio, setBio] = useState(initialBio);

  useEffect(() => {
    if (!isLoading) {
      setIsEdit(false);
    }
  }, [isLoading])

  const handleSave = () => {
    onSave?.(bio);
    setIsEdit(false);
  };

  return (
    <Card className="w-full max-w-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 shadow-md rounded-xl">
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          About Me
        </CardTitle>
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
              className="w-full p-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md border border-gray-300 dark:border-gray-700 resize-none"
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write something about yourself..."
            />
            <Button
              size="sm"
              className="w-fit bg-green-600 hover:bg-green-700 text-white"
              onClick={handleSave}
              disabled={isLoading}
            >
              {
                isLoading ? "Saving..." : "Save"
              }
            </Button>
          </div>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">
            {bio || "No bio added yet."}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default BioSection;

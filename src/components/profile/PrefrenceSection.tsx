"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export type Preferences = {
  notifications: boolean;
  theme: "light" | "dark" | "system";
};

type Props = {
  preferences?: Preferences;
  isLoading?: boolean;
  error?: any;
  isSuccess?: boolean;
  onSave?: (data: Preferences) => void;
};

const PreferencesSection = ({ preferences, onSave, isLoading, isSuccess, error }: Props) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(preferences?.notifications ?? true);
  const [theme, setTheme] = useState<"light" | "dark" | "system">(preferences?.theme ?? "system");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Preferences updated successfully!");
      setIsEditing(false);
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to update preferences");
    }
    setNotificationsEnabled(preferences?.notifications ?? true);
    setTheme(preferences?.theme ?? "system");
  }, [preferences, isSuccess, error]);

  const handleSave = () => onSave?.({ notifications: notificationsEnabled, theme });
  const handleCancel = () => {
    setNotificationsEnabled(preferences?.notifications ?? true);
    setTheme(preferences?.theme ?? "system");
    setIsEditing(false);
  };

  return (
    <Card className="w-full bg-gradient-to-r from-[#00ff99]/10 to-[#b3ff00]/10 border border-gray-300 dark:border-gray-700 shadow-lg rounded-2xl mt-6">
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">Preferences</CardTitle>
        {!isEditing && (
          <Button
            size="sm"
            className="border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        )}
      </CardHeader>

      <CardContent className="flex flex-col gap-6 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">Enable Notifications</span>
          <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} disabled={!isEditing} />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-gray-700 dark:text-gray-300">Theme</span>
          <RadioGroup
            value={theme}
            onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
            className="flex gap-4"
          >
            {["light", "dark", "system"].map((t) => (
              <div key={t} className="flex items-center gap-1">
                <RadioGroupItem value={t} id={`theme-${t}`} disabled={!isEditing} />
                <label htmlFor={`theme-${t}`} className="text-gray-700 dark:text-gray-300 capitalize">{t}</label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {isEditing && (
          <div className="flex gap-2 justify-end mt-4">
            <Button size="sm" className="border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800" onClick={handleCancel}>
              Cancel
            </Button>
            <Button size="sm" className="bg-[#00ff99] hover:bg-[#b3ff00] text-black font-semibold" onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PreferencesSection;

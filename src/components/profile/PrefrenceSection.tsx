"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

export type Preferences = {
  notifications: boolean;
  theme: "light" | "dark" | "system";
};

type Props = {
  preferences?: Preferences;
  onSave?: (data: Preferences) => void;
};

const PreferencesSection = ({ preferences, onSave }: Props) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(preferences?.notifications ?? true);
  const [theme, setTheme] = useState<"light" | "dark" | "system">(preferences?.theme ?? "system");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSave?.({ notifications: notificationsEnabled, theme });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNotificationsEnabled(preferences?.notifications ?? true);
    setTheme(preferences?.theme ?? "system");
    setIsEditing(false);
  };

  return (
    <Card className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 shadow-md rounded-2xl mt-6">
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Preferences</CardTitle>
        {!isEditing && (
          <Button
            size="sm"
            className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </Button>
        )}
      </CardHeader>

      <CardContent className="flex flex-col gap-6 pt-2">
        {/* Notifications */}
        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">Enable Notifications</span>
          <Switch
            checked={notificationsEnabled}
            onCheckedChange={setNotificationsEnabled}
            disabled={!isEditing}
          />
        </div>

        {/* Theme selection */}
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
                <label htmlFor={`theme-${t}`} className="text-gray-700 dark:text-gray-300 capitalize">
                  {t}
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Save / Cancel Buttons */}
        {isEditing && (
          <div className="flex gap-2 justify-end mt-4">
            <Button
              size="sm"
              className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PreferencesSection;

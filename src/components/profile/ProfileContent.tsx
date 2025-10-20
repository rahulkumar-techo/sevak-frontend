"use client";

import React from "react";
import HeaderSection from "@/components/profile/HeaderSection";
import BioSection from "@/components/profile/BioSection";
import AddressSection, { Address } from "@/components/profile/AddressSection";
import PreferencesSection from "./PrefrenceSection";
import Header from "@/components/Header";
import {
  useUpdateBioMutation,
  useUpdateHeaderMutation,
  useUpdateLocationMutation,
  useUpdatePrefrenceMutation,
} from "@/redux/features/profile/profileApi";

type Preferences = {
  notifications: boolean;
  theme: "light" | "dark" | "system";
};

const ProfileContent = ({ user }: { user: any }) => {
  // ---------- Save Handlers ----------
  const [updateHeader, { isLoading: isHeaderLoading }] = useUpdateHeaderMutation();
  const handleHeaderSave = (data: { fullName: string; avatar: File | string }) => {
    const avatar = data.avatar instanceof File ? data.avatar : undefined;
    updateHeader({ avatar, fullName: data.fullName });
  };

  const [updateBio, { isLoading: bioLoading }] = useUpdateBioMutation();
  const handleBioSave = (bio: string) => updateBio({ bio });

  const [updateLocation, { isLoading: isUpdatingLocation, error: locationError }] = useUpdateLocationMutation();
  const handleAddressSave = (addressData: Address) => updateLocation(addressData);

  const [updatePrefrence, { isLoading: preferencesLoading, isSuccess: preferencesSuccess, error: preferencesError }] =
    useUpdatePrefrenceMutation();
  const handlePreferencesSave = (preferences: Preferences) =>
    updatePrefrence({ notifications: preferences.notifications, theme: preferences.theme });

  // ---------- Initial data ----------
  const initialAddress: Address = {
    type: "Point",
    coordinates: [0, 0],
    city: "",
    state: "",
    country: "",
    postalCode: "",
    landmark: "",
  };

  const initialPreferences: Preferences = {
    notifications: true,
    theme: "light",
  };

  return (
    <>
      <Header activeItem={-1} />
      <div className="min-h-screen w-full bg-white dark:bg-black text-gray-900 dark:text-white py-10 px-4 mt-[60px]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row md:gap-8 gap-0 lg:gap-12">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-8">
            <HeaderSection
              fullName={user?.fullName || "Rahul Kumar"}
              avatar={user?.avatar?.url || "/default-avatar.jpg"}
              isActive={user?.isActive || false}
              isVerified={user?.isVerified || false}
              role={user?.roles?.[0] || "User"}
              onSave={handleHeaderSave}
              isLoading={isHeaderLoading}
            />
            <BioSection onSave={handleBioSave} initialBio={user?.bio || ""} isLoading={bioLoading} />
          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-8">

            <PreferencesSection
              onSave={handlePreferencesSave}
              preferences={user?.preferences || initialPreferences}
              isLoading={preferencesLoading}
              isSuccess={preferencesSuccess}
              error={preferencesError}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileContent;

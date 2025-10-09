"use client";

import React from "react";
import HeaderSection from "@/components/profile/HeaderSection";
import BioSection from "@/components/profile/BioSection";
import GallerySection, { FileItem } from "@/components/profile/GallerySection";
import AddressSection, { Address } from "@/components/profile/AddressSection";
import PreferencesSection from "@/components/profile/PrefrenceSection";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import { useUpdateBioMutation, useUpdateGalleryMutation, useUpdateHeaderMutation, useUpdateLocationMutation, useUpdatePrefrenceMutation } from "@/redux/features/profile/profileApi";



type Preferences = {
    notifications: boolean;
    theme: "light" | "dark" | "system";
};

const ProfileContent = ({ user }: { user: any }) => {
    // ---------- Save Handlers ----------
    const [updateHeader, { isLoading: isPrefrenceLoading }] = useUpdateHeaderMutation()
    const handleHeaderSave = (data: { fullName: string; avatar: File | string }) => {
        let avatar: File | undefined;

        if (data.avatar instanceof File) {
            // if avatar is a File object (new image)
            avatar = data.avatar;
        } else {
            // if avatar is a string (existing image URL)
            avatar = undefined;
        }
        updateHeader({ avatar, fullName: data?.fullName })
    };
    const [updateBio, { isLoading: bioLoading }] = useUpdateBioMutation()
    const handleBioSave = (bio: string) => {
        updateBio({ bio })
    };
    const [updateGallery, { isLoading }] = useUpdateGalleryMutation()

    const handleGallerySave = (data: {
        images: FileItem[];
        videos: FileItem[];
        deletedFileIds: string[];
    }) => {
        updateGallery({
            galleryPhotos: data.images,
            videos: data.videos,
            deletedFileIds: data.deletedFileIds,
        });
    };
    const [updateLocation, { isLoading: isUpdatingLocation, error: locationError }] = useUpdateLocationMutation()
    const handleAddressSave = (addressData: Address) => {
        console.log(addressData)
       updateLocation(addressData);
    };
    const [updatePrefrence, { isLoading: preferencesLoading, isSuccess: preferencesSuccess, error: preferencesError }] = useUpdatePrefrenceMutation()
    const handlePreferencesSave = (preferences: any) => {
        updatePrefrence({ notifications: preferences?.notifications, theme: preferences?.theme })
    }

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

    console.log(user)

    return (
        <>
            <Header activeItem={-1} />
            <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-white py-8 px-4 mt-[60px]">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* Left Column */}
                    <div className="flex-1 flex flex-col gap-6 lg:gap-8">
                        <HeaderSection
                            fullName={user?.fullName || "Rahul Kumar"}
                            avatar={user?.avatar?.url || "/default-avatar.jpg"}
                            isActive={user?.isActive || false}
                            isVerified={user?.isVerified || false}
                            role={user?.roles?.[0] || "User"}
                            onSave={handleHeaderSave}
                            isLoading={isPrefrenceLoading}
                        />
                        <BioSection onSave={handleBioSave} initialBio={user?.bio || ""} isLoading={bioLoading} />
                    </div>

                    {/* Right Column */}
                    <div className="flex-1 flex flex-col gap-6 lg:gap-8">
                        {/* Gallery Section */}
                        <GallerySection
                            galleryPhotos={user?.galleryPhotos}
                            videos={user?.videos}
                            onSave={handleGallerySave}
                            isLoading={isLoading}
                        />

                        {/* Address Section */}
                        <AddressSection
                            onSave={handleAddressSave}
                            initialAddress={user?.location||initialAddress}
                            isLoading={isUpdatingLocation}
                            error={locationError}
                        />

                        {/* Preferences Section */}
                        <PreferencesSection
                            onSave={handlePreferencesSave}
                            preferences={user?.preferences ||initialPreferences}
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
